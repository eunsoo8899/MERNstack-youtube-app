import React, {useEffect, useState} from 'react'
import SingleComment from './SingleComment'

function ReplyComment(props) {

  const [ChildCommentNumber, setChildCommentNumber] = useState(0)
  const [OpenReplyComments, setOpenReplyComments] = useState(false)

  useEffect(() => {
    let commentNumber = 0;
      props.CommentLists.map((comment) => {
        if (comment.responseTo === props.parentCommentId) {
          commentNumber++
        }
      })
    setChildCommentNumber(commentNumber)
  }, [props.CommentLists, props.parentCommentId])

  let renderReplyComment = (parentCommentId) => 
    props.CommentLists && props.CommentLists.map((comment, index) => (        
      <React.Fragment>
      {comment.responseTo === parentCommentId && 
        <div style={{ marginLeft: '50px', width:'80%'}}>
          <SingleComment comment={comment} postId={props.postId} refreshFunction={props.refreshFunction}/>
          <ReplyComment CommentLists={props.CommentLists} postId={props.postId} 
          parentCommentId={comment._id} refreshFunction={props.refreshFunction} />
        </div>
      }
      </React.Fragment>
        
    ))

    const handleChange = () => {
      setOpenReplyComments(!OpenReplyComments)
    }
  

  return (
    <div>

      {ChildCommentNumber > 0 &&
        <p 
        style={{ fontSize:'14px', marginBottom: '20px', color: 'gray' }} 
        onClick={handleChange}
      >View {ChildCommentNumber} more comments</p>
      }
      
      {OpenReplyComments &&
        renderReplyComment(props.parentCommentId)
      }
    </div>
  )
}

export default ReplyComment
