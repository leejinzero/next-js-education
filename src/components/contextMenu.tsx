'use client'
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export default function ContextMenu() {
    const router = useRouter();
    const params = useParams();
    
    if (params.id == undefined) {
        return null;
    }

    return <>
        <li><Link href={`/update/${params.id}`}>Update</Link></li>
        <li><button onClick={() => {
            fetch(`http://localhost:9999/pages/${params.id}`, {
                method : 'DELETE'
            }).then(() => {
                    router.push('/');
                    router.refresh();
                });
        }}>Delete</button></li>
    </>;
}