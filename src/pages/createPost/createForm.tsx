import {useForm} from "react-hook-form"
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import {addDoc, collection} from 'firebase/firestore'
import {auth, db} from '../../config/firebase'
import { useAuthState } from "react-firebase-hooks/auth"
import { useNavigate } from "react-router-dom"

interface createFormdata {
    title: string;
    description: string;
}

export const CreateForm = () => {

    const schema = yup.object().shape({
        title: yup.string().required("You must add a title"),
        description: yup.string().required("Decription of the post is required")
    })

    const {register, handleSubmit, formState: {errors} } = useForm ({
        resolver: yupResolver(schema)
    })

    const postsRef = collection(db, "posts");

    const [user] = useAuthState(auth);

    const navigate = useNavigate();

    const onCreatePost = async(data: createFormdata) =>{
        await addDoc(postsRef, {
            // title: data.title,
            // description: data.description,
            ...data,
            username: user?.displayName,
            id: user?.uid
        });
        navigate("/");
    }

    return <div className="parent-container">
    <form onSubmit={handleSubmit(onCreatePost)} className="form-container">
        <textarea placeholder="Title..." {...register("title")}/>
        <p style={{color: "red"}}>{errors.title?.message}</p>
        <textarea placeholder="Description..." {...register("description")}/>
        <p style={{color: "red"}}>{errors.description?.message}</p>
        <input type="submit"/>
    </form></div>
}