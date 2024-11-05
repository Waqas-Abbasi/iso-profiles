import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const sampleProfiles = [
    {
        redditUsername: 'muslim_brother123',
        age: 28,
        gender: 'Male',
        ageRangeMin: 24,
        ageRangeMax: 30,
        location: 'London, UK',
        willingToRelocate: true,
        ethnicity: 'Pakistani',
        openToMixing: true,
        maritalStatus: 'Single',
        marriageTimeline: 'Within 6 months',
        characteristics: 'Practicing, Kind, Family-oriented, Career-focused, Respectful',
        religiosity: 'Practicing - Pray 5 times, Fast, Avoid Music',
        education: 'Masters in Computer Science',
        educationWanted: 'Bachelors or higher',
        jobStatus: 'Software Engineer at Tech Company',
        wantKids: true,
        hobbies: 'Reading, Hiking, Photography, Islamic Studies',
        interesting: "I've memorized 10 juz of the Quran and working on completing it",
    },
    {
        redditUsername: 'modest_muslimah',
        age: 25,
        gender: 'Female',
        ageRangeMin: 25,
        ageRangeMax: 32,
        location: 'Toronto, Canada',
        willingToRelocate: false,
        ethnicity: 'Arab',
        openToMixing: true,
        maritalStatus: 'Single',
        marriageTimeline: 'Within 1 year',
        characteristics: 'Religious, Independent, Ambitious, Caring, Creative',
        religiosity: 'Moderately practicing - Growing in faith',
        education: 'Bachelor in Architecture',
        educationWanted: 'Minimum Bachelors',
        jobStatus: 'Junior Architect',
        wantKids: true,
        hobbies: 'Painting, Cooking, Traveling, Learning new languages',
        interesting: 'I speak 4 languages and currently learning Turkish',
    },
    {
        redditUsername: 'seeking_halal',
        age: 30,
        gender: 'Male',
        ageRangeMin: 25,
        ageRangeMax: 33,
        location: 'New York, USA',
        willingToRelocate: true,
        ethnicity: 'Indian',
        openToMixing: false,
        maritalStatus: 'Divorced',
        marriageTimeline: 'ASAP',
        characteristics: 'God-conscious, Mature, Stable, Understanding, Active',
        religiosity: 'Very practicing - Following Sunnah',
        education: 'PhD in Islamic Studies',
        educationWanted: 'Any level with strong deen',
        jobStatus: 'Islamic Teacher',
        wantKids: true,
        hobbies: 'Writing, Teaching, Martial Arts, Gardening',
        interesting: "I've written a book about modern Muslim relationships",
    },
    {
        redditUsername: 'hijabi_doc',
        age: 27,
        gender: 'Female',
        ageRangeMin: 27,
        ageRangeMax: 35,
        location: 'Dubai, UAE',
        willingToRelocate: true,
        ethnicity: 'Malaysian',
        openToMixing: true,
        maritalStatus: 'Single',
        marriageTimeline: '1-2 years',
        characteristics: 'Compassionate, Intellectual, Patient, Organized, Fun-loving',
        religiosity: 'Practicing - Balance deen and dunya',
        education: 'Medical Doctor',
        educationWanted: 'Professional degree preferred',
        jobStatus: 'Resident Doctor',
        wantKids: true,
        hobbies: 'Swimming, Reading medical journals, Volunteering, Baking',
        interesting: 'I run a free medical clinic for refugees on weekends',
    },
    {
        redditUsername: 'tech_muslim',
        age: 29,
        gender: 'Male',
        ageRangeMin: 24,
        ageRangeMax: 30,
        location: 'San Francisco, USA',
        willingToRelocate: false,
        ethnicity: 'Turkish',
        openToMixing: true,
        maritalStatus: 'Single',
        marriageTimeline: 'Within 6 months',
        characteristics: 'Tech-savvy, Athletic, Ambitious, Funny, Religious',
        religiosity: 'Practicing - Modern but committed',
        education: 'BS in Computer Engineering',
        educationWanted: 'Any level with similar values',
        jobStatus: 'Senior Software Engineer',
        wantKids: false,
        hobbies: 'Coding, Rock climbing, Playing chess, Coffee roasting',
        interesting: 'I built a popular Muslim prayer times app',
    },
];

async function main() {
    console.log('Start seeding ...');

    for (const profile of sampleProfiles) {
        const result = await prisma.profile.create({
            data: profile,
        });
        console.log(`Created profile with id: ${result.id}`);
    }

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
