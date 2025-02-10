import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ID } from "appwrite";

export default function PostForm({ post }) {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        try {
            setError("");
            setLoading(true);

            const slug = post ? post.$id : ID.unique();

            if (post) {
                // Handle update
                let featuredImage = post.featuredImage;
                if (data.image && data.image[0]) {
                    const file = await appwriteService.uploadFile(data.image[0]);
                    if (!file) {
                        setError("Failed to upload image. Please try again.");
                        return;
                    }
                    await appwriteService.deleteFile(post.featuredImage);
                    featuredImage = file.$id;
                }

                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featuredImage,
                });

                if (dbPost && dbPost.$id) {
                    navigate(`/post/${dbPost.$id}`);
                } else {
                    setError("Failed to update post. Please try again.");
                }
            } else {
                // Handle create
                if (!data.image || !data.image[0]) {
                    setError("Please select a featured image");
                    return;
                }

                const file = await appwriteService.uploadFile(data.image[0]);
                if (!file || !file.$id) {
                    setError("Failed to upload image. Please try again.");
                    return;
                }

                try {
                    const dbPost = await appwriteService.createPost({ 
                        ...data, 
                        slug,
                        featuredImage: file.$id,
                        userId: userData.$id 
                    });

                    if (dbPost && dbPost.$id) {
                        navigate(`/post/${dbPost.$id}`);
                    } else {
                        // If post creation failed, cleanup the uploaded image
                        if (file.$id) {
                            await appwriteService.deleteFile(file.$id);
                        }
                        setError("Failed to create post. Please try again.");
                    }
                } catch (error) {
                    // If post creation throws an error, cleanup the uploaded image
                    if (file.$id) {
                        await appwriteService.deleteFile(file.$id);
                    }
                    if (error.message.includes("too long")) {
                        setError("Content is too long. Please keep it under 500 characters.");
                    } else {
                        setError(error.message || "Failed to create post. Please try again.");
                    }
                }
            }
        } catch (err) {
            console.error("Form submission error:", err);
            setError(err.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <div className="w-full">
            {error && (
                <div className="w-full max-w-4xl mx-auto mb-4 bg-red-100 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                </div>
            )}
            <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
                <div className="w-2/3 px-2">
                    <Input
                        label="Title :"
                        placeholder="Title"
                        className="mb-4"
                        {...register("title", { required: true })}
                        disabled={loading}
                    />
                    <Input
                        label="Slug :"
                        placeholder="Slug"
                        className="mb-4"
                        {...register("slug", { required: true })}
                        onInput={(e) => {
                            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                        }}
                        disabled={loading}
                    />
                    <RTE 
                        label="Content :" 
                        name="content" 
                        control={control} 
                        defaultValue={getValues("content")}
                    />
                </div>
                <div className="w-1/3 px-2">
                    <Input
                        label="Featured Image :"
                        type="file"
                        className="mb-4"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("image", { required: !post })}
                        disabled={loading}
                    />
                    {post && (
                        <div className="w-full mb-4">
                            <img
                                src={appwriteService.getFilePreview(post.featuredImage)}
                                alt={post.title}
                                className="rounded-lg"
                            />
                        </div>
                    )}
                    <Select
                        options={["active", "inactive"]}
                        label="Status"
                        className="mb-4"
                        {...register("status", { required: true })}
                        disabled={loading}
                    />
                    <Button 
                        type="submit" 
                        bgColor={post ? "bg-green-500" : undefined} 
                        className="w-full"
                        disabled={loading}
                    >
                        {loading ? (
                            <div className="flex items-center justify-center">
                                <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                                {post ? "Updating..." : "Creating..."}
                            </div>
                        ) : (
                            post ? "Update" : "Submit"
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}