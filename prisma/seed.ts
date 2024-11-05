import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Helper arrays for generating realistic data
const cities = [
    'London, UK',
    'Birmingham, UK',
    'Manchester, UK',
    'Toronto, Canada',
    'Vancouver, Canada',
    'Montreal, Canada',
    'New York, USA',
    'San Francisco, USA',
    'Chicago, USA',
    'Houston, USA',
    'Dubai, UAE',
    'Abu Dhabi, UAE',
    'Sharjah, UAE',
    'Sydney, Australia',
    'Melbourne, Australia',
    'Singapore',
    'Kuala Lumpur, Malaysia',
];

const professions = [
    'Software Engineer',
    'Doctor',
    'Teacher',
    'Architect',
    'Lawyer',
    'Business Analyst',
    'Accountant',
    'Professor',
    'Researcher',
    'Engineer',
    'Pharmacist',
    'Dentist',
    'Marketing Manager',
    'Financial Analyst',
    'Data Scientist',
    'Product Manager',
    'UX Designer',
    'Consultant',
];

const hobbies = [
    'reading',
    'hiking',
    'photography',
    'cooking',
    'traveling',
    'painting',
    'swimming',
    'gardening',
    'writing',
    'martial arts',
    'baking',
    'chess',
    'calligraphy',
    'volunteering',
    'teaching Quran',
    'rock climbing',
    'cycling',
    'pottery',
    'learning languages',
];

const timelines = ['ASAP', 'Within 6 months', 'Within 1 year', '1-2 years'];
const maritalStatuses = ['Single', 'Divorced', 'Widowed'];

function generateUsername(profession: string, index: number): string {
    const prefixes = ['muslim', 'halal', 'modest', 'practicing', 'deen'];
    const suffixes = ['seeker', 'soul', 'heart', 'minded', 'professional'];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    return `${prefix}_${profession.toLowerCase().replace(' ', '')}_${suffix}${index}`;
}

function generateBio(profession: string, hobbiesList: string[]): string {
    const selectedHobbies = hobbiesList
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .join(', ');

    return `${profession} with strong Islamic values. Practicing Muslim who prioritizes deen and family. Enjoy ${selectedHobbies}. Looking for someone who shares similar values and life goals.`;
}

function generateProfiles(count: number) {
    const profiles = [];

    for (let i = 0; i < count; i++) {
        const gender = Math.random() > 0.5 ? 'Male' : 'Female';
        const age = Math.floor(Math.random() * (35 - 23) + 23);
        const profession = professions[Math.floor(Math.random() * professions.length)];

        profiles.push({
            redditUsername: generateUsername(profession, i),
            age,
            gender,
            ageRangeMin: age - 2,
            ageRangeMax: age + 5,
            location: cities[Math.floor(Math.random() * cities.length)],
            willingToRelocate: Math.random() > 0.5,
            maritalStatus: maritalStatuses[Math.floor(Math.random() * maritalStatuses.length)],
            marriageTimeline: timelines[Math.floor(Math.random() * timelines.length)],
            bio: generateBio(profession, hobbies.sort(() => 0.5 - Math.random()).slice(0, 5)),
        });
    }

    return profiles;
}

async function main() {
    console.log('Start seeding ...');

    const profiles = generateProfiles(120); // Generating 120 profiles

    for (const profile of profiles) {
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
