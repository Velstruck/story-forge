import React from 'react'
import appwriteService from '../appwrite/config'
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredImage, content }) {
    // Create a truncated version of content for preview
    const truncateContent = (text, maxLength = 100) => {
        if (!text) return '';
        // Strip HTML tags
        const strippedText = text.replace(/<[^>]+>/g, '');
        return strippedText.length > maxLength ? strippedText.substring(0, maxLength) + '...' : strippedText;
    };

    return (
        <Link to={`/post/${$id}`}>
            <div className='bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-[400px] flex flex-col'>
                <div className='w-full h-48 overflow-hidden'>
                    <img 
                        src={appwriteService.getFilePreview(featuredImage)} 
                        alt={title}
                        className='w-full h-full object-cover hover:scale-105 transition-transform duration-300'
                    />
                </div>
                <div className='p-4 flex flex-col flex-grow'>
                    <h2 className='text-xl font-bold mb-2 text-gray-800 line-clamp-2 hover:text-blue-600 transition-colors'>
                        {title}
                    </h2>
                    <p className='text-gray-600 text-sm flex-grow line-clamp-3'>
                        {truncateContent(content)}
                    </p>
                    <div className='mt-4'>
                        <span className='inline-flex items-center bg-blue-50 text-blue-600 text-sm px-3 py-1 rounded-full hover:bg-blue-100 transition-colors'>
                            <span>Read More</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default PostCard