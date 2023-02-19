import * as ScrollArea from "@radix-ui/react-scroll-area";
import styled from "styled-components";

interface comentario {
  comment_author: string;
  comment_content: string;
  comment_id: string;
}

const comment_arr = [
  { comment_author: "larry", comment_content: "cade minhas flores", comment_id: "1" },
  { comment_author: "asdf", comment_content: "cade minhas flores jorgiiiiin", comment_id: "2" },
  { comment_author: "fw", comment_content: "cade ", comment_id: "3" },
  { comment_author: "dfs", comment_content: "cade minhas flores", comment_id: "4" },
  { comment_author: "dfs", comment_content: "cade minhas flores", comment_id: "5" },
  { comment_author: "dfs", comment_content: "cade minhas flores", comment_id: "6" },
  { comment_author: "dfs", comment_content: "cade minhas flores", comment_id: "7" },
  { comment_author: "dfs", comment_content: "cade minhas flores", comment_id: "8" },
  { comment_author: "dfs", comment_content: "cade minhas flores", comment_id: "9" },
  { comment_author: "dfs", comment_content: "cade minhas flores", comment_id: "11" },
  { comment_author: "dfs", comment_content: "cade minhas flores", comment_id: "22" },
  { comment_author: "dfs", comment_content: "cade minhas flores", comment_id: "33" },
  { comment_author: "dfs", comment_content: "cade minhas flores", comment_id: "44" },
  { comment_author: "dfs", comment_content: "cade minhas flores", comment_id: "55" },
  { comment_author: "dfs", comment_content: "cade minhas flores", comment_id: "66" },
  { comment_author: "dfs", comment_content: "cade minhas flores", comment_id: "77" },
];

function CommentsScroll({ comentarios }: { comentarios: comentario[] }) {
  return (
    <Wrapper>
      <ScrollArea.Root className="ScrollAreaRoot">
        <ScrollArea.Viewport className="ScrollAreaViewport">
          {comentarios.map((comentario) => (
            <p key={comentario.comment_id}>
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
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-top: 2rem;

  p {
    margin-top: 0.5rem;
    font-size: 1.1rem;
    color: #333333;

    span {
      font-weight: bold;

      margin-right: 0.5rem;
    }
  }

  .ScrollAreaRoot {
    height: 20rem;
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
