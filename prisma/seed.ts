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
        maritalStatus: 'Single',
        marriageTimeline: 'Within 6 months',
        bio: 'Practicing Muslim, Software Engineer with Masters in Computer Science. I pray 5 times, fast, and have memorized 10 juz of the Quran. Looking for someone with Bachelors or higher education. Enjoy reading, hiking, and photography. Open to mixing and currently based in London but willing to relocate.',
    },
    {
        redditUsername: 'modest_muslimah',
        age: 25,
        gender: 'Female',
        ageRangeMin: 25,
        ageRangeMax: 32,
        location: 'Toronto, Canada',
        willingToRelocate: false,
        maritalStatus: 'Single',
        marriageTimeline: 'Within 1 year',
        bio: 'Moderately practicing Muslimah working as a Junior Architect. Ambitious and creative professional with a Bachelor in Architecture. Multilingual - speaking 4 languages and currently learning Turkish. Enjoy painting, cooking, and traveling. Looking for someone with minimum Bachelors education.',
    },
    {
        redditUsername: 'seeking_halal',
        age: 30,
        gender: 'Male',
        ageRangeMin: 25,
        ageRangeMax: 33,
        location: 'New York, USA',
        willingToRelocate: true,
        maritalStatus: 'Divorced',
        marriageTimeline: 'ASAP',
        bio: 'Islamic Teacher with PhD in Islamic Studies. Very practicing and following Sunnah. Author of a book about modern Muslim relationships. Interested in writing, teaching, martial arts, and gardening. Looking for someone with strong deen regardless of education level.',
    },
    {
        redditUsername: 'hijabi_doc',
        age: 27,
        gender: 'Female',
        ageRangeMin: 27,
        ageRangeMax: 35,
        location: 'Dubai, UAE',
        willingToRelocate: true,
        maritalStatus: 'Single',
        marriageTimeline: '1-2 years',
        bio: 'Medical Doctor currently in residency. Practicing Muslim balancing deen and dunya. Run a free medical clinic for refugees on weekends. Enjoy swimming, reading medical journals, and baking. Looking for someone with a professional degree.',
    },
    {
        redditUsername: 'tech_muslim',
        age: 29,
        gender: 'Male',
        ageRangeMin: 24,
        ageRangeMax: 30,
        location: 'San Francisco, USA',
        willingToRelocate: false,
        maritalStatus: 'Single',
        marriageTimeline: 'Within 6 months',
        bio: 'Senior Software Engineer, practicing Muslim with modern outlook. Created a popular Muslim prayer times app. Tech-savvy and athletic, enjoy coding, rock climbing, and chess. Looking for someone with similar values. Not planning to have children.',
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
