import React from "react";

type ReadProps = {
    params: {
        id: any;
    };
};

export default async function Read(props: ReadProps) {
    const option = {
        next : {revalidate : 0}
    }
    const resp = await fetch(`http://localhost:9999/pages/${props.params.id}`, option);
    const data = await resp.json();

    return <div>
        <h2>{data.title}</h2>
        {data.body}
    </div>
}