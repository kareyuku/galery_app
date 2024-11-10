import Link from "next/link";

export default function Album() {
    return <Link 
    href="/album"
    className="bg-gray-900 h-[200px] text-white p-2 rounded-md"
    > 
        <h1>Album</h1>
    </Link>
}