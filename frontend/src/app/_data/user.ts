// import { verifySession } from "../_lib/session";
// import { cache } from 'react'

// export const getUser = cache(async () => {
//     const session = await verifySession()

//     // Filter user data
//     const filteredUser = userDTO(user)

//     return filteredUser

// })

// function userDTO(user) {
//     taintUniqueValue(
//         'Do not pass a user session token to the client.',
//         user,
//         user.session.token,
//     )
//     return {
//         name: user.name,
//         email: user.email,
//         session: user.session,
//     }
// }

// function canViewAudit(auditTrail, role) {
//     return role === 'admin' ? auditTrail : null
// }
