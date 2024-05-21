
'use client'

import { useRouter } from "next/navigation";

export default function Create() {
    const router = useRouter();
    function handleSubmit(evt) {
        evt.preventDefault();
        const title = evt.target.titleInput.value;
        const body= evt.target.bodyInput.value;

        const option = {
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                title,
                body
            })
        }
        fetch('http://localhost:9999/pages',option)
        .then(resp => resp.json())
        .then(data => {
            router.push(`/read/${data.id}`);
            router.refresh();
        });
    }

    return <>
        <h2>Create</h2>
        <form onSubmit={handleSubmit}>
            <p><input type="text" name='titleInput' placeholder="title"></input></p>
            <p><textarea name="bodyInput" placeholder="body"></textarea></p>
            <p><input type="submit" /></p>
        </form>
    </>
}