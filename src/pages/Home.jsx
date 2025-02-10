import React, { useState, useEffect } from 'react'
import appwriteService from '../appwrite/config'
import { Container, PostCard } from '../components'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Home() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const authStatus = useSelector((state) => state.auth.status)

    useEffect(() => {
        appwriteService.getPosts()
            .then((posts) => {
                if (posts) {
                    setPosts(posts.documents)
                }
                setLoading(false)
            })
    }, [])

    if (loading) {
        return (
            <div className="w-full min-h-screen bg-gray-50 flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        )
    }

    if (!authStatus) {
        return (
            <div className="w-full min-h-screen bg-gray-50">
                <div className="w-full py-8 mt-4 text-center">
                    <Container>
                        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
                            <h1 className="text-4xl font-bold text-gray-800 mb-4">
                                Welcome to Story Forge
                            </h1>
                            <p className="text-xl text-gray-600 mb-8 max-w-2xl">
                                A place where stories come to life. Join our community to start sharing your thoughts and experiences.
                            </p>
                            <Link 
                                to="/login" 
                                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                            >
                                Login to Start Writing
                            </Link>
                        </div>
                    </Container>
                </div>
            </div>
        )
    }

    return (
        <div className='w-full min-h-screen bg-gray-50'>
            {/* Hero Section */}
            <div className="relative py-16">
                <div className="absolute inset-0 overflow-hidden">
                    <img 
                        src="https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1973&q=80"
                        alt="Hero background"
                        className="w-full h-full object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 mix-blend-multiply"></div>
                </div>
                <Container>
                    <div className="relative max-w-3xl mx-auto text-center px-4">
                        <h1 className="text-4xl font-bold mb-4 text-white">
                            Discover Amazing Stories
                        </h1>
                        <p className="text-xl mb-8 text-blue-100">
                            Read and share experiences that matter to you
                        </p>
                        <Link 
                            to="/add-post" 
                            className="inline-flex items-center bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                        >
                            <span>Write a Story</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 5v14M5 12h14"/>
                            </svg>
                        </Link>
                    </div>
                </Container>
            </div>

            {/* Posts Grid */}
            <Container>
                <div className='py-8'>
                    <h2 className="text-2xl font-bold text-gray-800 mb-8">Latest Stories</h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                        {posts.map((post) => (
                            <div key={post.$id}>
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Home