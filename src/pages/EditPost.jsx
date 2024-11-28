import React,{useState,useEffect} from 'react'
import service from '../appwrite/config'
import { Container, PostForm } from '../components'
import { useParams,useNavigate } from 'react-router-dom'




function EditPost() {
    const [post, setPosts] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if(slug){
            service.getPost(slug)
            .then((post) => {
                if (post) {
                    setPosts(post)
                }
            })
        }
        else{
            navigate('/') 
        }
    }, [navigate,slug])

  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  ): null
}

export default EditPost