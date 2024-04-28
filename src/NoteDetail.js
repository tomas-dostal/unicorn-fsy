
function NoteDetail({ note }) {

    return (
        <div>
            <div> {note.title}</div>
            <div> {note.content}</div>
        </div>
    );
}

export default NoteDetail;
