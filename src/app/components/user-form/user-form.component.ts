import { Component, OnInit } from '@angular/core';
import { CepService } from '../../services/cep.service';
import { UserService } from '../../services/user.service';
import Person from '../../interfaces/person';
import { Router } from '@angular/router';




@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  selectedPerson = new Person 
  loading;

  constructor(public cep: CepService, public service: UserService , private router: Router) { }

  changeCep(event) {
    var cep = event.target.value
    if (cep.length == 8) {
      this.loading = true
      this.cep.getCep(cep).then((apiResponse: any) => {
        if (apiResponse.erro) {
          alert('Cep não encontrado')
        } else {
          this.selectedPerson = {
            ...this.selectedPerson,
            cep: apiResponse.cep.replace('-', ''),
            state: apiResponse.uf,
            city: apiResponse.localidade,
            street: apiResponse.logradouro
          }
        }
      }).catch(error => {
        alert('Erro ao buscar o cep')
        console.error(error)
      }).finally(() => this.loading = false)
    }
  }

  submit(person) {
    console.log(person)
    if (person.name && person.cpf && person.phone && person.email && person.cep && person.state && person.city && person.street){
      this.service.savePerson(person);
      this.router.navigate(['home']);
    } else {
      alert('Erro!\nPreencha todos os campos!')
    }
  }

  cancel(){
    this.router.navigate(['home']);
  }


  ngOnInit() {
    this.selectedPerson = this.service.getPerson();
  }

  ngOnDestroy() {
    this.service.setPerson(new Person);
  }

}
