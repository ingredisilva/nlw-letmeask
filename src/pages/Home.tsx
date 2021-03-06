
import { useHistory } from 'react-router-dom'
import { FormEvent, useState } from 'react';


import illustrationImg from '../assets/img/illustration.svg';
import logoImg from '../assets/img/logo.svg';
import googleIconImg from '../assets/img/google-icon.svg';

import { database } from '../Services/firebase';

import { Button } from '../components/Button';

import { useAuth } from '../hooks/useAuth';


import '../styles/auth.scss';

export function Home() {
    const history = useHistory();
    const { user, signInWithGoogle } = useAuth();
    const [roomCode, setRoomCode] = useState('');


    async function handleCreateRoom() {
        if (!user) {
            await signInWithGoogle();
        }


        history.push('/rooms/new');
    }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault();

        if (roomCode.trim() === '') {
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if (!roomRef.exists()) {
            alert('Room Does not exist.');
            return;
        }

    }

    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração sobre perguntas e respostas" />
                <strong>Crie salas Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="LetmeAsk" />
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleIconImg} alt="Logo do Google" />
                        Crie sua sala com o Google
                    </button>
                    <div className="separator"> Ou Entre em uma Sala</div>
                    <form>
                        <input type="text"
                            placeholder="Digite o código da sala"
                            onChange={event => setRoomCode(event.target.value)}
                            value={roomCode} />
                        <Button type="submit">Entrar na Sala </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}
