import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Container, Button } from 'react-bootstrap';
import ReactFileReader from 'react-file-reader';
import { Base64 } from 'js-base64';
import Headline from '../components/IU/Headline';
import { Context } from '../index';
import { ARCH_THIRD_ROUTE } from '../utils/consts';
import { useHttpArchivariusStart } from '../http/archivariusAPI';
import Loader from '../components/IU/Loader';
import InstructionForSecondPage from '../components/instructions/InstructionForSecondPage';

const ArchSecondPage = () => {
    const { request, loading } = useHttpArchivariusStart();
    const history = useNavigate();
    const { selection, archivariusResult } = useContext(Context);
    const [noConnection, setNoConnection] = useState('');
    const [option, setOption] = useState({ ...selection.selection[0] });
    const [textFile, setTextFile] = useState('');
    const [settings, setSettings] = useState(JSON.parse(localStorage.getItem("settings")));
    const [isActive, setIsActive] = useState(true);
    const [isActiveInstruction, setisActiveInstruction] = useState(false);

    const chooseSelectionHandler = (e) => {
        e.preventDefault();
        const optionRes = selection.selection.filter((s) => s.id.toString() === e.target.value.toString());
        setOption(optionRes[0]);
    }
    const handleFiles = (files) => {
        if (files.base64[0].length === 5) {
            setNoConnection('Нет поисковых слов!');
            return;
        }
        let text = files.base64[0].split(',')[1];
        text = Base64.decode(text);
        setTextFile(text);
        setNoConnection('');
    }

    useEffect(() => {
        if (textFile !== '') {
            setIsActive(false);
        }
    }, [textFile]);

    const startHandler = async () => {
        setNoConnection('');
        request(settings.serverIp, settings.serverPort, textFile, option.id, option.title)
            .then((data) => {
                if (data.error === 103) {
                    setNoConnection(data.message);
                    return;
                } else if (data.error === 404) {
                    setNoConnection(data.message);
                    return;
                } else {
                    archivariusResult.setEventDataResult(data.eventDataResult);
                    archivariusResult.setPathResult(data.pathResult);
                    archivariusResult.setWordResult(data.wordResult);
                    console.log('data.wordResult', data.wordResult);

                    history(ARCH_THIRD_ROUTE);
                }
            })
    }

    if (loading) {
        return <Loader />
    }

    return <Container>
        <Headline>Модуль Архивариус 3000 (2/3)</Headline>
        <Form.Group controlId="formFileMultiple" className="mb-3">
            <Form.Label>Выберите файл с поисковыми словами (*.txt)</Form.Label>
            <ReactFileReader
                fileTypes={[".txt"]}
                base64={true}
                multipleFiles={true}
                handleFiles={handleFiles}
            >
                <button>Выбрать файл</button>
            </ReactFileReader>
        </Form.Group>

        <Form.Group controlId="formFileMultiple" className="mb-3">
            <Form.Label>Область поиска</Form.Label>
            <Form.Select onChange={chooseSelectionHandler}>
                {selection.selection.map((item) => {
                    return (
                        <option key={item.id} value={item.id}>{item.title}</option>
                    )
                })}
            </Form.Select>
        </Form.Group>
        <Button
            disabled={isActive}
            style={{ marginTop: "20px", marginBottom: "20px" }}
            onClick={startHandler}
        >
            Старт
        </Button>
        <p>{noConnection}</p>
        <Button
            variant="light"
            onClick={() => setisActiveInstruction(!isActiveInstruction)}>
            {isActiveInstruction ? "Скрыть инструкцию" : "Показать инструкцию"}
        </Button>
        {isActiveInstruction && <InstructionForSecondPage />}
    </Container>
}

export default ArchSecondPage;