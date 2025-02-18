import { redirect } from 'next/navigation';

import AddProfileForm from '@/components/AddProfileForm';

export default function AddProfilePage() {
    redirect('/');

    return <AddProfileForm />;
}
