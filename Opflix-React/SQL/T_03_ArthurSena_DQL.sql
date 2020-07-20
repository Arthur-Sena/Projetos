use T_OpFlix

--DQL

select * from Genero
select * from Tipo
select * from Usuario
select * from TipoUsuario
select * from Lancamento
select * from Plataforma
select * from Favorito

select Lancamento.Nome , Lancamento.Sinopse, Lancamento.Duracao ,Plataforma.Plataforma ,Tipo.Tipo , Genero.Nome
	From Lancamento
	inner Join Plataforma
	on Plataforma.IdPlataforma = Lancamento.IdLancamentos
	inner join Tipo 
	on Tipo.IdTipo = Lancamento.Id_Tipo
	inner join Genero 
	on Genero.IdGenero = Lancamento.Id_Genero

select Usuario.Nome , TipoUsuario.Tipo
From Usuario
inner join TipoUsuario
on Usuario.Id_TipoUsuario = TipoUsuario.Id_TipoUsuario

select Usuario.Nome As Usuario, Lancamento.Nome as Favorito
from Favorito
inner join Usuario
on Favorito.Id_Usuario = Usuario.Id_Usuario
inner join Lancamento
on Lancamento.IdLancamentos = Favorito.IdLancamento
