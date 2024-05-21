'use client'
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type UpdateProps = {
    params: {
        id: any;
    };
};

export default function Update(props: UpdateProps) {
    // const [title, setTitle] = useState('');
    // const [body, setBody] = useState('');
    const router = useRouter();
    const [page, setPage] = useState({});
    useEffect(() => {
        fetch(`http://localhost:9999/pages/${props.params.id}`)
        .then(resp => resp.json())
        .then(data => {
            console.log('data',data);
            setPage({title : data.title, body : data.body})
        });
    }, []);
    
    function handleSubmit(evt) {
        evt.preventDefault();
        const title = evt.target.titleInput.value;
        const body= evt.target.bodyInput.value;

        const option = {
            method:'PUT',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                title,
                body
            })
        }
        fetch(`http://localhost:9999/pages/${props.params.id}`,option)
        .then(resp => resp.json())
        .then(data => {
            router.push(`/read/${data.id}`);
            router.refresh();
        });
    }
    return <div>
        <h2>Update</h2>
        <form onSubmit={handleSubmit}>
            <p><input type="text" name='titleInput' placeholder="title" value={page.title}
                onChange={(evt) => {
                    const title = evt.target.value;
                    // page.title = title;
                    // setPage(page);
                    const newPage = {...page};
                    newPage.title = title;
                    setPage(newPage);
                }}
            ></input></p>
            <p><textarea name="bodyInput" placeholder="body" value={page.body}
                onChange={(evt) => {
                    const body = evt.target.value;
                    const newPage = {...page};
                    newPage.body = body;
                    setPage(newPage);
                }}
            ></textarea></p>
            <p><input type="submit" /></p>
        </form>
    </div>
}