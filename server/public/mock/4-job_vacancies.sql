# usuario 1 - pizzaria bella vista

insert into job_vacancy (local, employer_id, name, description, amount) values ("any", 1, 'vaga para pizzaiolo', 'buscamos pizzaiolos para trabalhar aos finais de semana na pizzaria', 1);
insert into knowledge (name, knowledge_type_id, job_vacancy_id, differential) values ('cozinheiro', 5, 1, false);
insert into knowledge (name, knowledge_type_id, job_vacancy_id, differential) values ('pizzaiolo', 5, 1, true);
insert into knowledge (name, knowledge_type_id, job_vacancy_id, differential) values ('italiano', 6, 1, true);

insert into job_vacancy (local, employer_id, name, description, amount) values ("city", 1, 'vaga para entregador', 'buscamos entregadores para entregar pizzas todas as noites', 3);
insert into knowledge (name, knowledge_type_id, job_vacancy_id, differential) values ('entregador', 5, 2, false);
insert into knowledge (name, knowledge_type_id, job_vacancy_id, differential) values ('italiano', 6, 2, true);