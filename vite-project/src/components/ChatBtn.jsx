import { Link } from "react-router-dom";
import { FaRegCommentDots } from "react-icons/fa"; // chat icon

function ChatBtn() {
  return (
    
      <Link to="/chatPage" className="btn btn-outline-primary rounded-circle d-flex align-items-center justify-content-end ms-3" style={{ width: '40px', height: '40px' }}>
        <FaRegCommentDots size={20} />
      </Link>

  );
}

export default ChatBtn;
