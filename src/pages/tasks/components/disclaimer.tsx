import type { ReactElement } from 'react';

export const Disclaimer = (): ReactElement => {
  return (
    <div className="bg-[#2F3241] py-[14px] px-[32px] max-w-[877px] mt-[31px] shadow-default">
      <h3 className="font-extrabold text-base text-white">Aviso de Isenção de Responsabilidade</h3>

      <br />
      <div>
        <p className="text-[#DEDEDE] text-base font-medium">
          Ao usar o esse gerenciador, você concorda com o seguinte:
        </p>

        <br />
        <h4 className="text-white font-extrabold text-base">👩‍⚕️ Saúde</h4>
        <p className="text-[#DEDEDE] text-base font-medium">
          Não use o aplicativo para gerenciar tarefas cuja falha ou esquecimento possa colocar sua saúde ou vida em
          risco.
        </p>

        <br />
        <h4 className="text-white font-extrabold text-base">💣 Atualizações</h4>
        <p className="text-[#DEDEDE] text-base font-medium">
          Entenda que atualizações podem resultar em perda de dados ou quebra de funcionalidade.
        </p>

        <br />
        <h4 className="text-white font-extrabold text-base">💻 Dados</h4>
        <p className="text-[#DEDEDE] text-base font-medium">
          As informações são armazenadas no seu dispositivo e não garantimos a segurança desses dados.
        </p>

        <br />
        <h4 className="text-white font-extrabold text-base">🔒 Privacidade</h4>
        <p className="text-[#DEDEDE] text-base font-medium">
          Seus dados NUNCA serão enviados a um servidor, permanecendo no SEU DISPOSITIVO. Você é responsável pela
          privacidade de suas informações.
        </p>

        <br />
        <h4 className="text-white font-extrabold text-base">🧑‍💻 Perda de Dados</h4>
        <p className="text-[#DEDEDE] text-base font-medium">
          Não somos responsáveis por qualquer perda de dados, já que os dados permanecerão no seu dispositivo
        </p>

        <br />
        <h4 className="text-white font-extrabold text-base">🤔 Porque tem esses termos?</h4>
        <p className="text-[#DEDEDE] text-base font-medium">
          Este projeto foi criado para satisfazer as necessidades pessoais do desenvolvedor e não é um serviço
          comercial. Para garantir liberdade na realização de atualizações e mudanças, o desenvolvedor optou por se
          isentar de todas as responsabilidades. Assim, é necessário que os usuários aceitem esses termos para utilizar
          o Gerenciador de Rotinas.
        </p>
        <br />

        <p className="text-[#DEDEDE] text-base font-medium">
          Ao utilizar o Gerenciador de Rotinas, você isenta completamente os desenvolvedores de qualquer
          responsabilidade. Use por sua própria conta e risco.
        </p>
      </div>

      <div className="mt-[25px] flex gap-[58px]">
        <button
          type="button"
          className="font-extrabold text-base text-white px-[27px] py-[18px] bg-[#FF5F5F] rounded-[3px]">
          Não Aceito
        </button>

        <button
          type="button"
          className="font-extrabold text-base text-white px-[27px] py-[18px] bg-[#212332] rounded-[3px]">
          Concordar e Usar o Aplicativo
        </button>
      </div>
    </div>
  );
};
