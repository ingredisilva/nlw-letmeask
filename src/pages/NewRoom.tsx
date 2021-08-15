
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import illustrationImg from '../assets/img/illustration.svg';
import logoImg from '../assets/img/logo.svg';
import googleIconImg from '../assets/img/google-icon.svg';
import { Button } from '../components/Button';

import '../styles/auth.scss';

export function NewRoom() {
    const { user } = useContext(AuthContext);


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
                    <h2>Criar uma nova sala</h2>
                    <form>
                        <input type="text"
                            placeholder="Nome da Sala" />
                        <Button type="submit">
                            Criar Sala
                        </Button>
                    </form>
                    <p>
                        Quer entrar em uma sala existente? <Link to="/">Clique Aqui </Link>
                    </p>
                </div>
            </main>
        </div>
    );
}
