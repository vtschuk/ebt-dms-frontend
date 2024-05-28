import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Position} from "../model/position";
import {environment} from "../../environments/environment.development";
import {Profession} from "../model/profession";
import {Certification} from "../model/certification";
import {Observable} from "rxjs";
import {Education} from "../model/education";
import {Expertise} from "../model/expertise";
import {Language} from "../model/language";
import {Role} from "../model/role";
import {User} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  uri = '/admin'

  constructor(private httpClient: HttpClient) {
  }

  /* Position */
  getAllPositions(): Observable<Position[]> {
    return this.httpClient.get<Position[]>(environment.host + this.uri + '/position/all');
  }

  getPositionById(id: number): Observable<Position> {
    return this.httpClient.get<Position>(environment.host + this.uri + '/position/' + id);
  }

  addPosition(position: Position) {
    return this.httpClient.post(environment.host + this.uri + '/position', position, {'headers': environment.headers})
  }

  changePosition(id: number, position: Position): Observable<Position> {
    return this.httpClient.put<Position>(environment.host + this.uri + '/position' + id, position)
  }

  deletePosition(id: number) {
    return this.httpClient.delete(environment.host + this.uri + '/position/' + id)
  }

  /* Profession */
  getAllProfessions() {
    return this.httpClient.get<Profession[]>(environment.host + this.uri + '/profession/all');
  }

  getProfessionById(id: number) {
    return this.httpClient.get<Profession[]>(environment.host + this.uri + '/profession/' + id);
  }

  addProfession(profession: Profession): Observable<Profession> {
    return this.httpClient.post<Profession>(environment.host + this.uri + '/profession', profession, {'headers': environment.headers})
  }

  changeProfession(id: number, position: Profession): Observable<Profession> {
    return this.httpClient.put<Profession>(environment.host + this.uri + '/profession' + id, position)
  }

  deleteProfession(id: number) {
    return this.httpClient.delete(environment.host + this.uri + '/profession/' + id)
  }

  /* Certificate */

  getAllCertificate() {
    return this.httpClient.get<Certification[]>(environment.host + this.uri + '/cert/all');
  }

  getCertificateById(id: number): Observable<Certification> {
    return this.httpClient.get<Certification>(environment.host + this.uri + '/cert/' + id);
  }

  addCertificate(cert: Certification): Observable<Certification> {
    return this.httpClient.post<Certification>(environment.host + this.uri + '/cert', cert, {'headers': environment.headers})
  }

  changeCertificate(id: number, profession: Profession) {
    return this.httpClient.put<Profession>(environment.host + this.uri + '/cert' + id, profession)
  }

  deleteCertificate(id: number) {
    return this.httpClient.delete(environment.host + this.uri + '/cert/' + id)
  }

  /* Education */

  getAllEducation() {
    return this.httpClient.get<Education[]>(environment.host + this.uri + '/education/all');
  }

  //Education
  addEducation(education: Education): Observable<Education> {
    return this.httpClient.post<Education>(environment.host + this.uri + '/education', education, {'headers': environment.headers})
  }

  changeEducation(id: number, profession: Profession): Observable<Education> {
    return this.httpClient.put<Education>(environment.host + this.uri + '/education' + id, profession)
  }

  deleteEducation(id: number) {
    return this.httpClient.delete(environment.host + this.uri + '/education/' + id)
  }

  // Expertise
  getAllExpertise(): Observable<Expertise[]> {
    return this.httpClient.get<Expertise[]>(environment.host + this.uri + '/expertise/all')

  }

  addExpertise(expertise: Expertise): Observable<Expertise> {
    return this.httpClient.post<Expertise>(environment.host + this.uri + '/expertise', expertise, {'headers': environment.headers})
  }

  deleteExpertise(id: number) {
    return this.httpClient.delete(environment.host + this.uri + '/expertise/' + id)
  }

  // Languages
  changeLanguage(language: Language) {
    return this.httpClient.post(environment.host + this.uri + '/language', language)
  }

  getAllLanguages(): Observable<Language[]> {
    return this.httpClient.get<Language[]>(environment.host + this.uri + '/language/all')
  }

  // Role
  getAllRoles(): Observable<Role[]> {
    return this.httpClient.get<Role[]>(environment.host + this.uri + '/role/all');
  }

  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(environment.host + '/api/user/all')
  }
}
