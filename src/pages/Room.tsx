import { useParams } from 'react-router-dom';
import { FormEvent, useState } from 'react'

import logoImg from '../assets/img/logo.svg';

import { Button } from "../components/Button";

import { RoomCode } from "../components/RoomCode"

import { useAuth } from '../hooks/useAuth';
import { database } from '../Services/firebase';

import '../styles/room.scss';

type RoomParams = {
    type: string;
}
export function Room() {
    const user = useAuth();
    const params = useParams<RoomParams>();

    const [newQuestion, setNewQuestion] = useState('');

    const roomId = params.id;

    //  const { title, questions } = useRoom(roomId)

    async function handleSendQuestion(event: FormEvent) {
        event.preventDefault()

        if (newQuestion.trim() === '') {
            return;
        }

        if (!user) {
            throw new Error('You must be logged in');

        }

        const question = {
            content: newQuestion,
            author: {
                name: user.name,
                avatar: user.avatar,
            },
            isHighlighted: false,
            isAnswered: false
        };

        await database.ref(`rooms/${roomId}/questions`).push(question);

        setNewQuestion('');
    }


    return (
        <div id="pageRoom">
            <header>
                <div className="content">
                    <img src={logoImg} alt="letmeask" />
                    <RoomCode code={roomId} />
                </div>
            </header>

            <main className="room-title">
                <div className="room-title">
                    <h1> Sala React</h1>
                    <span>4 perguntas</span>
                </div>

                <form onChange={handleSendQuestion}>
                    <textarea
                        placeholder="O que você quer perguntar?"
                        onChange={event => setNewQuestion(event.target.value)}
                        value={newQuestion} />

                    <div className="form-footer">
                        {user ? (
                            <div className="user-info">
                                <img src={user.avatar} alt={user.name} />
                                <span>{user.name}</span>
                            </div>
                        ) : (<span>Para enviar uma pergunta, <button>faça seu Login</button></span>
                        )}
                        <Button type="submit" disabled={!user}>Enviar Perguntas</Button>
                    </div>
                </form>



            </main>
        </div>
    );
}