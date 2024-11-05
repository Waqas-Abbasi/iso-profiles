'use client';

import { useQueryState } from 'nuqs';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

export default function SortSelect() {
    const [sort, setSort] = useQueryState('sort', { defaultValue: 'newest', shallow: false });

    return (
        <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="age-asc">Age: Low to High</SelectItem>
                <SelectItem value="age-desc">Age: High to Low</SelectItem>
            </SelectContent>
        </Select>
    );
}
