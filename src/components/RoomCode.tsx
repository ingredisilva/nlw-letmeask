import copyImg from '../assets/img/copy.svg';

type RoomCodeProps = {
    code: string;
}

export function RoomCode(props: RoomCodeProps) {

    function copyRoomCodetoClipboard() {
        navigator.clipboard.writeText(props.code)
    }

    return (
        <button className="room-code">
            <div>
                <img src={copyImg} alt="Copy room code" />
                <span>Sala #{props.code}</span>
            </div>
        </button>
    )
}