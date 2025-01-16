import moment from 'moment';
import {useEffect, useState} from "react";

interface MessageProps {
  user: string;
  timestamp: Date;
  content: string;
}

const TypewriterText = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 25);

    return () => clearInterval(typingInterval);
  }, [text]);

  return <span>{displayedText}</span>;
};

export default function Message({ user, timestamp, content }: MessageProps) {
  return (
    <div className={`message-wrapper mb-4 text-left max-w-96`}>
      <div className={`inline-block max-w-3/4 p-3 rounded-sm message-content ${user === 'User' ? 'message-content-user' : 'message-content-ai'}`}>
        <p className="font-bold">{user}</p>
        <p className="text-sm text-gray-500">{moment(timestamp).format('MMM D, YYYY, h:mm:ss')}</p>
        {
          user === 'User'
            ?
            <p className="mt-1">{content}</p>
            :
            <TypewriterText text={content} />
        }
      </div>
    </div>
  )
}
