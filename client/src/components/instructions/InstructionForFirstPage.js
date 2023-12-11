import img1 from '../../img/1.jpg';
import img2 from '../../img/2.jpg';
import img3 from '../../img/3.jpg';
import img4 from '../../img/4.jpg';
import img5 from '../../img/5.jpg';

const InstructionForFirstPage = () => {

    return <div>
        <p style={{ marginTop: "50px", fontSize: '18px' }}>1. Создать индекс</p>
        <img width="300" src={img1} alt='картинка'/>
        <p style={{ marginTop: "50px", fontSize: '18px' }}>
            2. Далее в настройках, "Сервер"-"Общие"-"Количество документов на
            одной странице результатов", ставим значение <b>1000</b>
        </p>
        <img width="600" src={img2} alt='картинка'/>
        <p style={{ marginTop: "50px", fontSize: '18px' }}>3. Выбираем ip-адрес и порт сервера</p>
        <img width="600" src={img3} alt='картинка'/>
        <p style={{ marginTop: "50px", fontSize: '18px' }}>
            4. Далее в настройках, "Протокол"-"Ограничить размер протокола" - <b>убираем галочку</b>
        </p>
        <img width="600" src={img4} alt='картинка'/>
        <p style={{ marginTop: "50px", fontSize: '18px' }}>5. Настройка завершена, теперь можем запустить сервер программы Архивариус</p>
        <img style={{ marginBottom: "80px" }} width="300" src={img5} alt='картинка'/>
    </div>
}

export default InstructionForFirstPage;