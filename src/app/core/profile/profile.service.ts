import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { QUERY_USER_DETAILS, QUERY_PROJECTS_BY_USER, QUERY_IS_MENTOR } from '@app/shared/queries/user-queries';
import { MUTATION_UPDATE_USER_DETAILS } from '@app/shared/mutations/user-mutations';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private http: HttpClient, private apollo: Apollo) {}

  /*
   * getUserDetails
   */
  public getUserDetails(username: string) {
    return this.apollo
      .watchQuery<any>({
        query: QUERY_USER_DETAILS,
        variables: {
          username: username
        }
      })
      .valueChanges.pipe(take(1))
      .pipe(
        map((res: any) => {
          return res.data;
        })
      );
  }

  /*
   * Check if the logged in user is a mentor
   */
  public checkIfUserIsMentor() {
    return this.apollo
      .watchQuery<any>({
        query: QUERY_IS_MENTOR,
        variables: {
          userId: localStorage.getItem('user_id') || ''
        }
      })
      .valueChanges.pipe(take(1))
      .pipe(
        map((res: any) => {
          return res.data;
        })
      );
  }

  /**
   * UpdateUserDetails
   */
  public UpdateUserDetails(updateObject: Object) {
    return this.apollo
      .mutate<any>({
        mutation: MUTATION_UPDATE_USER_DETAILS,
        variables: {
          userId: localStorage.getItem('user_id'),
          updateObject: updateObject
        }
      })
      .pipe(take(1))
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  /**
   * getUserProjects
   */
  public getUserProjects(username: string) {
    return this.apollo
      .watchQuery<any>({
        query: QUERY_PROJECTS_BY_USER,
        variables: {
          username: username
        }
      })
      .valueChanges.pipe(take(1))
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  /**
   * uploadImage
   */
  public uploadImage(image: File): Observable<Object> {
    const formData = new FormData();
    formData.append('file', image, localStorage.getItem('username'));
    formData.append('upload_preset', 'qdninpjl');
    return this.http.post('https://api.cloudinary.com/v1_1/cynthesize/image/upload/', formData);
  }
}
