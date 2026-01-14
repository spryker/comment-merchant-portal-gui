import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { CommentsConfiguratorService } from '../../services/comments-configurator';
import { CommentComponent } from './comment.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LocalTimePipe } from './local-time.pipe';

const mockComment = {
    message: 'This is a mock comment',
    createdAt: '2024-02-27T12:00:00Z',
    fullname: 'John Doe',
    uuid: '123456',
    crf: 'ABC123',
    isUpdated: false,
    readonly: false,
};

const mockCommentTranslations = {
    update: 'Update',
    edit: 'Edit',
    remove: 'Remove',
    updated: 'Updated',
};

const mockCommentsConfiguratorService = {
    getAccomplishing: jest.fn().mockReturnValue(of({ id: 'different-id', type: 'type' })),
    commentAction: jest.fn(),
};

describe('CommentComponent', () => {
    let fixture: ComponentFixture<CommentComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [CommentComponent, LocalTimePipe],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {
                    provide: CommentsConfiguratorService,
                    useValue: mockCommentsConfiguratorService,
                },
            ],
        });

        fixture = TestBed.createComponent(CommentComponent);
    });

    describe('when readonly is false', () => {
        it('should render meta inputs with proper values', () => {
            fixture.componentRef.setInput('comment', mockComment);
            fixture.componentRef.setInput('translations', mockCommentTranslations);
            fixture.detectChanges();

            const crfInput = fixture.debugElement.query(By.css('input[name=_token]'));
            const uuidInput = fixture.debugElement.query(By.css('input[name=uuid]'));

            expect(crfInput.nativeElement.value).toBe(mockComment.crf);
            expect(uuidInput.nativeElement.value).toBe(mockComment.uuid);
        });

        it('should render message area', () => {
            fixture.componentRef.setInput('comment', mockComment);
            fixture.componentRef.setInput('translations', mockCommentTranslations);
            fixture.detectChanges();

            const messageComponent = fixture.debugElement.query(By.css('.mp-comment__message'));

            expect(messageComponent.nativeElement.textContent).toContain(mockComment.message);
        });

        it('should switch message to textarea area', async () => {
            fixture.componentRef.setInput('comment', mockComment);
            fixture.componentRef.setInput('translations', mockCommentTranslations);
            fixture.detectChanges();

            const buttons = fixture.debugElement.queryAll(By.css('spy-button'));
            const editButton = buttons[0]; // First button is edit

            editButton.nativeElement.click();
            await fixture.whenStable();
            fixture.detectChanges();

            const textAreaComponent = fixture.debugElement.query(By.css('spy-textarea'));
            const messageComponent = fixture.debugElement.query(By.css('.mp-comment__message'));

            expect(textAreaComponent).toBeTruthy();
            expect(messageComponent).not.toBeTruthy();
        });

        it('should trigger CommentsConfiguratorService.commentAction on update event', async () => {
            fixture.componentRef.setInput('comment', mockComment);
            fixture.componentRef.setInput('translations', mockCommentTranslations);
            fixture.detectChanges();

            const buttons = fixture.debugElement.queryAll(By.css('spy-button'));
            const editButton = buttons[0]; // First button is edit

            editButton.nativeElement.click();
            await fixture.whenStable();
            fixture.detectChanges();

            const updatedButtons = fixture.debugElement.queryAll(By.css('spy-button'));
            const updateButton = updatedButtons[0]; // After editing, first button becomes update

            updateButton.nativeElement.click();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(mockCommentsConfiguratorService.commentAction).toHaveBeenCalled();
        });

        it('should trigger CommentsConfiguratorService.commentAction on remove event', async () => {
            fixture.componentRef.setInput('comment', mockComment);
            fixture.componentRef.setInput('translations', mockCommentTranslations);
            fixture.detectChanges();

            const buttons = fixture.debugElement.queryAll(By.css('spy-button'));
            const removeButton = buttons[1]; // Second button is remove

            removeButton.nativeElement.click();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(mockCommentsConfiguratorService.commentAction).toHaveBeenCalled();
        });
    });

    describe('when readonly is true', () => {
        it('should not render meta inputs with proper values', () => {
            fixture.componentRef.setInput('comment', { ...mockComment, readonly: true });
            fixture.componentRef.setInput('translations', mockCommentTranslations);
            fixture.detectChanges();
            const crfInput = fixture.debugElement.query(By.css('input[name=_token]'));
            const uuidInput = fixture.debugElement.query(By.css('input[name=uuid]'));

            expect(crfInput).not.toBeTruthy();
            expect(uuidInput).not.toBeTruthy();
        });

        it('should render only message component', () => {
            fixture.componentRef.setInput('comment', { ...mockComment, readonly: true });
            fixture.componentRef.setInput('translations', mockCommentTranslations);
            fixture.detectChanges();
            const editButton = fixture.debugElement.query(By.css('.mp-comment__edit'));
            const messageComponent = fixture.debugElement.query(By.css('.mp-comment__message'));

            expect(editButton).not.toBeTruthy();
            expect(messageComponent).toBeTruthy();
        });
    });

    it('should render signature', () => {
        fixture.componentRef.setInput('comment', mockComment);
        fixture.componentRef.setInput('translations', mockCommentTranslations);
        fixture.detectChanges();

        const signature = fixture.debugElement.query(By.css('.mp-comment__signature'));

        expect(signature.nativeElement.textContent).toContain(mockComment.fullname);
    });
});
