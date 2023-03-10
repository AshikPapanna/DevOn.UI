import { TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';

import { ErrorHandlerInterceptor } from './error-handler.interceptor';
describe('ErrorHandlerInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ErrorHandlerInterceptor,MatSnackBar
      ],
      imports:[MatSnackBarModule,RouterTestingModule]
  }));

  it('should be created', () => {
    const interceptor: ErrorHandlerInterceptor = TestBed.inject(ErrorHandlerInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
