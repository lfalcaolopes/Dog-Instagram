import * as ScrollArea from "@radix-ui/react-scroll-area";
import styled from "styled-components";

interface comentario {
  comment_author: string;
  comment_content: string;
  comment_id: string;
}

function CommentsScroll({ comentarios }: { comentarios: comentario[] }) {
  const reversed = comentarios.reverse();
  return (
    <ScrollAreaWrapper>
      <ScrollArea.Root className="ScrollAreaRoot">
        <ScrollArea.Viewport className="ScrollAreaViewport">
          {reversed.map((comentario, index) => (
            <p key={`${comentario.comment_id}-${index}`}>
              <span>{comentario.comment_author}:</span>
              {comentario.comment_content}
            </p>
          ))}
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar className="ScrollAreaScrollbar" orientation="vertical">
          <ScrollArea.Thumb className="ScrollAreaThumb" />
        </ScrollArea.Scrollbar>
        <ScrollArea.Scrollbar className="ScrollAreaScrollbar" orientation="horizontal">
          <ScrollArea.Thumb className="ScrollAreaThumb" />
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner className="ScrollAreaCorner" />
      </ScrollArea.Root>
    </ScrollAreaWrapper>
  );
}

const ScrollAreaWrapper = styled.div`
  margin: 2rem 0 1rem;

  p {
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
    color: #333333;

    span {
      font-weight: bold;

      margin-right: 0.5rem;
    }
  }

  .ScrollAreaRoot {
    height: 16rem;
    overflow: hidden;
  }

  .ScrollAreaViewport {
    width: 100%;
    height: 100%;
  }

  .ScrollAreaScrollbar {
    display: flex;
    user-select: none;
    touch-action: none;
    padding: 2px;
    border-radius: 10px;
    background: hsl(0, 0%, 0%, 0.2);
  }

  .ScrollAreaScrollbar[data-orientation="vertical"] {
    width: 5px;
  }
  .ScrollAreaScrollbar[data-orientation="horizontal"] {
    flex-direction: column;
    height: 5px;
  }

  .ScrollAreaThumb {
    flex: 1;
    background: #454545;
    border-radius: 10px;
    position: relative;
  }

  .ScrollAreaThumb::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    min-width: 44px;
    min-height: 44px;
  }
`;

export default CommentsScroll;
