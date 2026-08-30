from django.shortcuts import render
from django.db.models import Max

# Create your views here.
from rest_framework import status
from rest_framework.decorators import api_view
from django.core.files.storage import FileSystemStorage
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import SignupSerializer, UserSerializer
from django.contrib.auth import login, logout, get_user_model
from _lib.session import decrypt, encrypt
from django.http import JsonResponse
import os
from .models import Filenames



User = get_user_model()

@api_view(['GET'])
def get_all_users(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def signin(request):
    username = request.data.get('username')
    password = request.data.get('password')
    
    user = authenticate(username=username, password=password)
    if user is not None:
        login(request, user)
                
        user_id = user.id  # Assuming 'id' is the primary key
        role = 'admin' if user.is_staff else 'user'
        
        session_token = encrypt({'userId': user_id, 'role': role})

        # Authentication successful
        response = Response(
            {
                'message': 'Sign-in successful!',
                'userId': user_id,
                'username': user.username,
                'role': role,
             },
            status=status.HTTP_200_OK)
        
        response.set_cookie(
            key='session',
            value=session_token,
            httponly=True,
            secure=True,  # Set to False during development if not using HTTPS
            samesite='Lax',
            max_age=60 * 60 * 24,  # 1 day in seconds
        )
        return response
    
    else:
        # Authentication failed
        return Response({'errors': {'error': 'Invalid username or password.'}}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
def signup(request):
    serializer = SignupSerializer(data=request.data)
    
    if serializer.is_valid():
        user = serializer.save()
        return Response({'message': 'User created successfully.', 'user': {'id': user.id, 'email': user.email}}, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def logout_view(request):
    response = Response({'message': 'Logged out successfully.'}, status=status.HTTP_200_OK)
    response.delete_cookie('session')
    return response

@api_view(['GET'])
def get_session(request):
    session_token = request.COOKIES.get('session')
    if not session_token:
        return Response({'authenticated': False}, status=status.HTTP_200_OK)
    
    payload = decrypt(session_token)
    
    if not payload or not payload.get('userId') or not payload.get('role'):
        return Response({'authenticated': False}, status=status.HTTP_200_OK)
    
    try:
        user = User.objects.get(id=payload['userId'])
        return Response({
            'authenticated': True,
            'userName': user.username,  # Adjust based on your User model
            'role': payload['role']
        }, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response({'authenticated': False}, status=status.HTTP_200_OK)
    
@api_view(['PUT'])
def update_is_staff(request, username):
    try:
        user = User.objects.get(username=username)
        is_staff = request.data.get('is_staff', None)

        if is_staff is None:
            return Response({"error": "is_staff field is required."}, status=status.HTTP_400_BAD_REQUEST)

        # Ensure is_staff is a boolean
        if isinstance(is_staff, bool):
            user.is_staff = is_staff
            user.save()
            return Response({"message": "User staff status updated successfully."}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Invalid data for is_staff."}, status=status.HTTP_400_BAD_REQUEST)
    
    except User.DoesNotExist:
        return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)
    
    
@api_view(['POST'])
def upload_file(request):
    if 'file' not in request.FILES:
        return Response({"error": "No file provided."}, status=status.HTTP_400_BAD_REQUEST)
    
    uploaded_file = request.FILES['file']
    
    # Validate that the uploaded file is a JSON file
    if not uploaded_file.name.lower().endswith('.json'):
        return Response({"error": "Only JSON files are allowed."}, status=status.HTTP_400_BAD_REQUEST)
    
    # Optional: Validate file size (e.g., max 5MB)
    MAX_UPLOAD_SIZE = 5 * 1024 * 1024  # 5MB
    if uploaded_file.size > MAX_UPLOAD_SIZE:
        return Response({"error": "File size exceeds the allowed limit of 5MB."}, status=status.HTTP_400_BAD_REQUEST)
    
    # Define the target directory using absolute paths
    target_directory = os.path.join('../frontend/public/json_generater/')
    
    # Ensure the target directory exists
    os.makedirs(target_directory, exist_ok=True)
    
    # Sanitize the filename to prevent directory traversal attacks
    filename = os.path.basename(uploaded_file.name)
    save_path = os.path.join(target_directory, filename)
    
    try:
        # Initialize FileSystemStorage
        fs = FileSystemStorage(location=target_directory)
        
        # Save the file using FileSystemStorage
        filename = fs.save(filename, uploaded_file)
        file_url = fs.url(filename)
        
        max_id = Filenames.objects.aggregate(Max('id'))['id__max'] or 0
        filename = Filenames(id = max_id + 1, name=uploaded_file.name)
        
        filename.save()
        
        return Response({
            "message": "File uploaded successfully!",
            "file_url": file_url
        }, status=status.HTTP_201_CREATED)
    
    except Exception as e:
        return Response({"error": f"File upload failed: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    