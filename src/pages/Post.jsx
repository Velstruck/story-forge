import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    if (!post) {
        return (
            <div className="w-full py-8">
                <Container>
                    <div className="flex justify-center items-center min-h-[400px]">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className="w-full py-8 bg-gray-50">
            <Container>
                <div className="max-w-4xl mx-auto bg-white rounded-2xl overflow-hidden shadow-lg">
                    <div className="w-full h-[400px] relative">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                        {isAuthor && (
                            <div className="absolute top-4 right-4 space-x-2">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button bgColor="bg-green-500" className="!px-4 !py-2 text-sm font-medium">
                                        Edit
                                    </Button>
                                </Link>
                                <Button 
                                    bgColor="bg-red-500" 
                                    className="!px-4 !py-2 text-sm font-medium"
                                    onClick={deletePost}
                                >
                                    Delete
                                </Button>
                            </div>
                        )}
                    </div>
                    <div className="p-8">
                        <h1 className="text-4xl font-bold text-gray-800 mb-6">
                            {post.title}
                        </h1>
                        <div className="prose prose-lg max-w-none">
                            {parse(post.content)}
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}