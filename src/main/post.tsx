import { Post as IPost} from "./main"
import { auth, db } from "../config/firebase";
import { addDoc, collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import {useAuthState} from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

interface Props {
    post: IPost;
}

interface Like {
    likeId: string;
    userId: string;
}

export const Post = (props: Props) => {
    const {post} = props;
    const [user] = useAuthState(auth);

    const [likes, setLikes] = useState<Like[] | null>(null);

    const likesRef = collection(db, "likes");

    const LikesDoc = query(likesRef, where("postId","==",post.id))

    const getLikes = async () => {
        const data = await getDocs(LikesDoc)
        setLikes(data.docs.map((doc) => ({userId: doc.data().userId, likeId: doc.id })));
    }
    useEffect(() => {
        getLikes();
    }, []);

    

    const addLike = async() =>{
        try {
        const newDoc = await addDoc(likesRef, {userId: user?.uid, postId:post.id });
        if (user) {
        setLikes((prev) => prev ? [...prev, {userId: user?.uid, likeId: newDoc.id}]: [{userId :user?.uid, likeId: newDoc.id}])
        }
    } catch (err) {
        console.log(err)
    }
    }

    const removeLike = async() =>{
        try {
            const liketoDeleteQuery = query(likesRef, where("postId","==",post.id), where("userId","==",user?.uid))

            const liketoDeleteData = await getDocs(liketoDeleteQuery)
            const liketoDelete = doc(db, "likes",liketoDeleteData.docs[0].id)
            await deleteDoc(liketoDelete);

        if (user) {
        setLikes((prev) => prev && prev.filter((like) => like.likeId !== liketoDeleteData.docs[0].id))
        }
    } catch (err) {
        console.log(err)
    }
    }


    const hasUserLiked = likes?.find((like)=> like.userId === user?.uid);
    
    return <div className="post-container">
                <div className="post-title"><h1>{post.title}</h1> </div>
                <div className="post-description"><p>{post.description}</p> </div>
                <div className="post-footer">
                    <p className="post-username">@{post.username}</p>
                    <button className="like-button" onClick={ hasUserLiked? removeLike : addLike}>
                        {hasUserLiked ? <>&#128078;</> : <>&#128077;</>}
                    </button>
                    {/* {likes && <p>Likes: {likes?.length}</p>} */}
                    <p className="like-count">{likes && likes.length > 0 && `Likes: ${likes.length}`}</p>
                </div>
    </div>
}