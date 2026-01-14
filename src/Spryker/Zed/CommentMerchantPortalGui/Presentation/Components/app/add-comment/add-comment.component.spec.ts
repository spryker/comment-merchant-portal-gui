import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { CommentsConfiguratorService } from '../../services/comments-configurator';
import { AddCommentComponent } from './add-comment.component';

const mockAddComment = {
    crf: 'mockCrf',
    ownerId: 'mockOwnerId',
    ownerType: 'mockOwnerType',
};

const mockCommentsConfiguratorService = {
    getAccomplishing: jest.fn().mockReturnValue(of({ type: 'type' })),
    getError: jest.fn().mockReturnValue(of(null)),
    commentAction: jest.fn(),
};

describe('AddCommentComponent', () => {
    let fixture: ComponentFixture<AddCommentComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [AddCommentComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {
                    provide: CommentsConfiguratorService,
                    useValue: mockCommentsConfiguratorService,
                },
            ],
        });

        fixture = TestBed.createComponent(AddCommentComponent);
    });

    it('should render <spy-textarea> component', () => {
        fixture.componentRef.setInput('addComment', mockAddComment);
        fixture.detectChanges();
        const textAreaComponent = fixture.debugElement.query(By.css('spy-textarea'));

        expect(textAreaComponent).toBeTruthy();
    });

    it('should render meta inputs with proper values', () => {
        fixture.componentRef.setInput('addComment', mockAddComment);
        fixture.detectChanges();
        const crfInput = fixture.debugElement.query(By.css('input[name=_token]'));
        const idInput = fixture.debugElement.query(By.css('input[name=ownerId]'));
        const typeInput = fixture.debugElement.query(By.css('input[name=ownerType]'));

        expect(crfInput.nativeElement.value).toBe(mockAddComment.crf);
        expect(idInput.nativeElement.value).toBe(mockAddComment.ownerId);
        expect(typeInput.nativeElement.value).toBe(mockAddComment.ownerType);
    });

    it('should trigger CommentsConfiguratorService.commentAction', () => {
        fixture.componentRef.setInput('addComment', mockAddComment);
        fixture.detectChanges();
        const buttonComponent = fixture.debugElement.query(By.css('spy-button'));

        buttonComponent.nativeElement.click();
        fixture.detectChanges();

        expect(mockCommentsConfiguratorService.commentAction).toHaveBeenCalled();
    });
});
