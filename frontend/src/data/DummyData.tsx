import { ExpanableActivityItemProps, IdentityCardItemProps, visitorInformationItemProps } from "@/types/information";

export const ActivityData: ExpanableActivityItemProps[] = [
    {
        title: 'Monash Cup Opening',
        description: 'Opening for anual monash cup happening at the field',
        status:' Open',
        statusColor: 'green',
        content: () => (
            <p>
              The Monash Cup Opening will take place at the field. This is a great opportunity to start the annual cup with exciting events and activities.
            </p>
        )
    },
    {
        title: 'Monash Coding League',
        description: 'Semester coding competition happening in Idea Link',
        status:' Close',
        statusColor: 'red',
        content: () => (
            <p>
              The Monash Coding League has concluded. The competition was held in the Idea Link, where participants showcased their coding skills.
            </p>
        )
    }
]

export const IdentityInfo: IdentityCardItemProps[] = [
    {
        label: 'Students',
        amount: 2000,
    },
    {
        label: 'Lecturers',
        amount: 203,
    },
    {
        label: 'Staffs',
        amount: 350,
    },
    {
        label: 'Visitors',
        amount: 50,
    },
]


export const VisitorInfo: visitorInformationItemProps[] = [
    {
        time: '10:00',
        visitorToday:  2303,
        visitorMonth: 2010,
    },
    {
        time: '11:00',
        visitorToday:  2403,
        visitorMonth: 1992,
    },
    {
        time: '12:00',
        visitorToday:  2134,
        visitorMonth: 2020,
    },
    {
        time: '13:00',
        visitorToday:  2212,
        visitorMonth: 2031,
    },
    {
        time: '14:00',
        visitorToday:  2303,
        visitorMonth: 2031,
    },
    {
        time: '15:00',
        visitorToday:  1902,
        visitorMonth: 1600,
    },
    {
        time: '16:00',
        visitorToday:  1632,
        visitorMonth: 1234,
    },
    {
        time: '17:00',
        visitorToday:  1421,
        visitorMonth: 1095,
    },
    {
        time: '18:00',
        visitorToday:  1023,
        visitorMonth: 812,
    },
    {
        time: '19:00',
        visitorToday:  821,
        visitorMonth: 654,
    },
]