import { Component, OnInit } from '@angular/core';
import { UserService }  from '../../services/user.service';
import { Router } from '@angular/router';
import Person from '../../interfaces/person'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  persons = new Person;
  columns = ['Nome', 'CPF', 'Telefone', 'Email', 'CEP', 'Estado', 'Cidade', 'Rua', 'Editar', 'Remover'];
  selectedPerson;

  constructor( public service : UserService, private router: Router ) { }

  addPerson() {
		this.selectedPerson = {};
	}

	editPerson(person) {
    this.service.setPerson(person);
    this.router.navigate(['user']);
	}

	deletePerson(person) {
		this.service.removePerson(person);
		this.persons = this.service.getAllPerson();
	}

  ngOnInit() {
    if (!this.service.getAllPerson() || !(this.service.getAllPerson().length)) this.service.populatePerson();
		this.persons = this.service.getAllPerson();
  }

}
