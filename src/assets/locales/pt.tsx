const messages = {
  pt: {
    translations: {
      'Clínico Geral': 'Clínico Geral',
      'Clínica Médica': 'Clínica Médica',
      'Cardiologia': 'Cardiologia',
      'Cancerologia': 'Cancerologia',
      'Dermatologia': 'Dermatologia',
      'Endocrinologia e Metabologia': 'Endocrinologia e Metabologia',
      'Ginecologia e Obstetrícia': 'Ginecologia e Obstetrícia',
      'Infectologia': 'Infectologia',
      'Medicina de Família e Comunidade': 'Medicina de Família e Comunidade',
      'Nefrologia': 'Nefrologia',
      'Ortopedia e Traumatologia': 'Ortopedia e Traumatologia',
      'Oftalmologia': 'Oftalmologia',
      'Otorrinolaringologia': 'Otorrinolaringologia',
      'Pediatras': 'Pediatras',
      'Psicologia': 'Psicologia',
      'Pediatria': 'Pediatria',
      'Psiquiatria': 'Psiquiatria',
      'Radiologia e Diagnóstico por Imagem': 'Radiologia e Diagnóstico por Imagem',
      'Urologista': 'Urologista',
      'Urologia': 'Urologia',

      dashboard: {
        site_under_construction: 'Sistema em construcao',
      },

      signin: {
        select_your_profile: 'Selecione seu perfil',
        patient_portal: 'Portal do Paciente',
        doctors_portal: 'Portal do Médico',
        login: 'Login',
        enter_your_email:
          'Digite seu endereço de e-mail e senha abaixo para acessar sua conta',
        email: 'E-mail',
        password: 'Senha',
        forgot_your_password: 'Esqueci minha senha',
        signup: 'Criar conta',
        email_required: 'E-mail obrigatório',
        enter_a_valid_email_address: 'Digite um e-mail válido',
        password_required: 'Senha obrigatória',
        authentication_error: 'Erro na autenticação',
        authentication_error_your_credentials_are_incorrect:
          'Ocorreu um erro ao fazer login, cheque as credenciais.',
      },

      signup: {
        sign_up: 'Faça seu cadastro',
        select_your_profile: 'Selecione seu perfil',
        i_am: 'Sou',
        patient_portal: 'paciente',
        doctors_portal: 'médico',
        name: 'Nome',
        email: 'E-mail',
        password: 'Senha',
        address: 'Endereço',
        birth_date: 'Informe a data de nascimento',
        rg: 'RG',
        rg_invalid_format: 'RG inválido',
        cpf: 'CPF',
        cpf_invalid_format: 'CPF inválido',
        crm: 'CRM (000000AA)',
        crm_invalid_format: 'CRM inválido',
        specialty: 'Especialidade',
        gender: 'Gênero',
        male: 'Masculino',
        female: 'Feminino',
        sign_in: 'Cadastrar',
        log_in: 'Voltar para login',
        user_role_required: 'Papel de usuário obrigatório',
        name_required: 'Nome obrigatório',
        email_required: 'E-mail obrigatório',
        enter_a_valid_email: 'Digite um e-mail válido',
        minimum_6_digits: 'No mínimo 6 dígitos',
        address_required: 'Endereço obrigatório',
        invalid_phone_number: 'O número de telefone não é válido.',
        rg_required: 'RG Obrigatório',
        cpf_required: 'CPF Obrigatório',
        crm_required: 'CRM Obrigatório',
        specialty_required: 'Especialidade é Obrigatória',
        you_must_be_over_18: 'Você deve ser maior de 18 anos.',
        birthdate_required: 'Data de Nascimento obrigatória',
        your_registration_was_completed_with_success: 'Cadastro realizado!',
        you_can_now_login_to: 'Você já pode fazer seu logon no AppClinic!',
        something_went_wrong_with_your_registration: 'Erro no cadastro',
        try_again: 'Ocorreu um erro ao fazer cadastro, tente novamente',
      },

      appointment: {
        day: 'Dia',
        hour: 'Hora',
        confirm: 'Confirmar',
        cancel: 'Cancelar',
        doctor: 'Doutor(a)',
        patient: 'Paciente',
        my_appointment: 'Meus Agendamentos',
        review_your_appointment: 'Revise seu agendamento',
        specialty: 'Especialidade',
        no_doctors_found:
          'Nenhum profissional de saúde disponível para essa especialidade',
        healthcare_professionals: 'Profissionais de saúde',
        schedule: 'Agendar',
        unavailable: 'Indisponível',
        schedule_success_title: 'Consulta agendada com sucesso',
        schedule_success_description: 'Consulta agendada com sucesso',
        schedule_error_title: 'Falha ao agendar consulta',
        schedule_error_description: 'Falha ao agendar consulta',
        cancel_success_title: 'Consulta cancelada com sucesso',
        cancel_success_description: 'Consulta cancelada com sucesso',
        cancel_error_title: 'Falha ao cancelar consulta',
        cancel_error_description: 'Falha ao cancelar consulta',
        new_appointment: 'Novo agendamento',
        back_to_specialties: 'Voltar para especialidades',
        gender: 'Sexo',
        no_timetables_available:
          'Não existe um horário disponível para este dia',
        back_to_doctors: 'Voltar aos profissionais de saúde',
        timetables_available: 'Horários disponíveis',
        select_day:
          '📘 Selecione um dia disponível na agenda de {{doctorName}}.',
      },

      dashboard_patient: {
        specialties: 'Especialidades',
        select_one_specialties:
          'Selecione uma especialidade, e faça um novo agendamento.',
        no_specialties_found: 'Nenhuma especialidade encontrada',
      },

      resetpassword: {
        reset_password: 'Redefinir senha',
        new_password: 'Nova senha',
        old_password: 'Confirmação de senha',
        change_password: 'Alterar senha',
        password_required: 'Senha obrigatória',
        password_does_not_match: 'Confirmação incorreta',
        password_reset_error: 'Erro ao resetar senha',
        password_reset_error_please_try_again:
          'Ocorreu um erro ao resetar sua senha, tente novamente',
      },

      forgotpassword: {
        select_your_profile: 'Selecione seu perfil',
        doctor: 'Médico',
        patient: 'Paciente',
        password_recovery: 'Recuperação de senha',
        enter_your_email:
          'Digite seu endereço de e-mail abaixo para recuperar senha',
        email: 'E-mail',
        log_in: 'Voltar ao login',
        recover_password: 'Recuperar',
        email_required: 'E-mail obrigatório',
        enter_a_valid_email: 'Digite um e-mail válido',
        recovery_email_sent: 'E-mail de recuperação enviado',
        check_your_email_inbox:
          'Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada',
        something_went_wrong_in_password_recovery:
          'Erro na recuperação de senha',
        try_again:
          'Ocorreu um erro ao tentar fazer a recuperação de senha, tente novamente.',
      },

      header: {
        welcome: 'Bem-vindo',
      },

      imageUploader: {
        delete: 'Exluir',
        drop_archive: 'Solte os arquivos aqui',
        archive_not_supported: 'Arquivo não suportado',
        drag_files_here: 'Arraste os arquivos aqui...',
      },
    },
  },
};

export { messages };
