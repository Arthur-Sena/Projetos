use T_OpFlix

---DML

insert into  TipoUsuario(Tipo) values ('Cliente'),('Administrador')
select * from TipoUsuario

insert into Tipo(Tipo) values ('Filme'),('S�rie')
select * from Tipo

insert into Genero(Nome) values ('A��o'),('Romance'),('Fic��o')
select * from Genero

insert into Usuario(Nome , Email,Senha,Id_TipoUsuario) values ('Erik','erik@email.com','123456',2 ),('Cassiana','cassiana@email.com
','123456',2)

select * from Usuario

insert into Usuario(Nome,Email,Senha,Id_TipoUsuario) 
	values ('Helena','helena@email.com','123456', 1) ,
		('Roberto','rob@email.com','3110',1 )

insert into Plataforma(Plataforma) values ('Netflix'),('Cinema'),('Televisao'),('Prime Video'),('Outros')

select * from Plataforma
select * from Tipo
select * from Genero

insert into Genero(Nome) values ('musical'),('Suspense'),('Drama'),('Anima��o')

select * from Lancamento

insert into Lancamento (Nome,Sinopse,Duracao,DataLancamento,IdPlataforma,Id_Tipo,Id_Genero) 
	values ('O Rei Le�o','O Rei Le�o, da Disney, dirigido por Jon Favreau, retrata uma jornada pela savana africana, onde nasce o futuro rei da Pedra do Reino, Simba. O pequeno le�o que idolatra seu pai, o rei Mufasa, � fiel ao seu destino de assumir o reinado...','1h 58min',2019/07/18 ,2 , 1, 4)
	,('La Casa De Papel 3 temp','Oito habilidosos ladr�es se trancam na Casa da Moeda da Espanha com o ambicioso plano de realizar o maior roubo da hist�ria e levar com eles mais de 2 bilh�es de euros...','3 Temporadas',2019-07-19,1,2,5)


insert into Favorito(Id_Usuario,IdLancamento) values (1,4),(1, 5),(2 , 7),( 3, 8),(1 ,8 )


update Lancamento set DataLancamento = '18/07/2019' where Nome = 'O Rei Le�o' 2019-07-19
update Lancamento set DataLancamento = '19/07/2019' where Nome = 'La Casa De Papel 3 temp'

insert into Lancamento (Nome,Sinopse,Duracao,DataLancamento,IdPlataforma,Id_Tipo,Id_Genero) 
	values ('Deuses Americanos','Shadow Moon � um ex-vigarista que serve como seguran�a e companheiro de viagem para o Sr. Wednesday, um homem fraudulento que �, na verdade, um dos velhos deuses, e est� na Terra em uma miss�o: reunir for�as para lutar contra as novas entidades','2 Temporadas','30/04/2017',4,2,6)
	,('Toy Story 4','Woody sempre teve certeza sobre o seu lugar no mundo e que sua prioridade � cuidar de sua crian�a, seja Andy ou Bonnie. Mas quando Bonnie adiciona um relutante novo brinquedo chamado Garfinho ao seu quarto... ','1h 40min','20/06/2019',2,1,7)


alter table Lancamento add ClassificacaoIndicativa	Varchar(20)

update Lancamento set ClassificacaoIndicativa = 'L' where IdLancamentos = 4 

update Lancamento set ClassificacaoIndicativa = '13' where IdLancamentos = 8
update Lancamento set ClassificacaoIndicativa = '16' where IdLancamentos = 5 
update Lancamento set ClassificacaoIndicativa = 'L' where IdLancamentos = 7 