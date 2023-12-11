import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, FloatingLabel } from 'react-bootstrap';
import Headline from '../components/IU/Headline';
import { Context } from '../index';
import { ARCH_SECOND_ROUTE } from '../utils/consts';
import { useHttpArchivariusConnection } from '../http/archivariusAPI';
import Loader from '../components/IU/Loader';
import InstructionForFirstPage from '../components/instructions/InstructionForFirstPage';

const ArchFirstPage = () => {
    const { request, loading } = useHttpArchivariusConnection();
    const history = useNavigate();
    const [isActive, setIsActive] = useState(true);
    const [isActiveInstruction, setisActiveInstruction] = useState(false);
    const { selection } = useContext(Context);
    const [noConnection, setNoConnection] = useState('');
    const [settings, setSettings] = useState(() => {
        const settingsPrepare = localStorage.getItem("settings");
        const settingsRes = JSON.parse(settingsPrepare);
        return settingsRes || { serverIp: "127.0.0.1", serverPort: "5555" };
    });

    useEffect(() => {
        localStorage.setItem("settings", JSON.stringify(settings));
    }, [settings]);

    useEffect(() => {
        if (settings.serverIp !== '' && settings.serverPort !== '') {
            setIsActive(false);
        }
    }, [settings]);

    const connectionHandler = async () => {
        setNoConnection('');
        selection.setSelection([]);
        request(settings)
            .then((data) => {
                if (data.error === 103) {
                    setNoConnection(data.message);
                } else if (data.error === 404) {
                    setNoConnection(data.message);
                } else {
                    selection.setSelection(data);
                    history(ARCH_SECOND_ROUTE);
                }
            })
    }
    if (loading) {
        return <Loader />
    }

    return <Container>
        <Headline>Модуль Архивариус 3000 (1/3)</Headline>
        <FloatingLabel
            controlId="floatingInput"
            label="Укажите IP-адрес сервера (из Архивариуса)"
            className="mb-3"
        >
            <Form.Control
                type="text"
                placeholder="127.0.0.1"
                name="serverIp"
                value={settings.serverIp}
                onChange={(e) => setSettings({ ...settings, [e.target.name]: e.target.value.trim() })}
            />
        </FloatingLabel>
        <FloatingLabel controlId="floatingPassword" label="Укажите порт сервера (из Архивариуса)">
            <Form.Control
                type="number"
                placeholder="5555"
                name="serverPort"
                value={settings.serverPort}
                onChange={(e) => setSettings({ ...settings, [e.target.name]: e.target.value.trim() })}
            />
        </FloatingLabel>
        <Button
            onClick={connectionHandler}
            style={{ marginTop: "20px", marginBottom: "20px" }}
            disabled={isActive}
        >
            Далее
        </Button>
        <p>{noConnection}</p>

        <Button
            variant="light"
            onClick={() => setisActiveInstruction(!isActiveInstruction)}>
            {isActiveInstruction ? "Скрыть инструкцию" : "Показать инструкцию"}
        </Button>
        {isActiveInstruction && <InstructionForFirstPage />}
    </Container>
}

export default ArchFirstPage;