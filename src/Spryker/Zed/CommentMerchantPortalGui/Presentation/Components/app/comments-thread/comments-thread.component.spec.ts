import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { CommentsConfiguratorService } from '../../services/comments-configurator';
import { CommentsThreadComponent } from './comments-thread.component';

const mockComment = {
    message: 'This is a mock comment',
    createdAt: '2024-02-27T12:00:00Z',
    fullname: 'John Doe',
    crf: 'ABC123',
    isUpdated: false,
    readonly: false,
};

const mockComments = Array.from({ length: 3 }, (_, i) => ({
    ...mockComment,
    uuid: i.toString(),
}));

const mockAddComment = {
    crf: 'mockCrf',
    ownerId: 'mockOwnerId',
    ownerType: 'mockOwnerType',
};

const mockActions = {
    create: {
        url: '/comment-merchant-portal-gui/comment/create',
    },
    update: {
        url: '/comment-merchant-portal-gui/comment/update',
        label: 'Update',
    },
    remove: {
        url: '/comment-merchant-portal-gui/comment/delete',
        label: 'Remove',
    },
    edit: {
        label: 'Edit',
    },
};

const mockCommentTranslations = {
    updated: 'Updated',
};

const mockCommentsConfiguratorService = {
    getComments: jest.fn().mockReturnValue(of(mockComments)),
    getError: jest.fn().mockReturnValue(of(null)),
    setInitial: jest.fn(),
};

describe('CommentsThreadComponent', () => {
    let fixture: ComponentFixture<CommentsThreadComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [CommentsThreadComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {
                    provide: CommentsConfiguratorService,
                    useValue: mockCommentsConfiguratorService,
                },
            ],
        });

        fixture = TestBed.createComponent(CommentsThreadComponent);
        fixture.componentRef.setInput('comments', mockComments);
        fixture.componentRef.setInput('translations', mockCommentTranslations);
        fixture.componentRef.setInput('actions', mockActions);
        fixture.componentRef.setInput('add', mockAddComment);

        TestBed.inject(CommentsConfiguratorService).setInitial(mockComments);
    });

    it('should render mp-add-comment', () => {
        fixture.detectChanges();
        const addComment = fixture.debugElement.query(By.css('mp-add-comment'));

        expect(addComment).toBeTruthy();
        expect(addComment.nativeElement.addComment).toEqual(mockAddComment);
        expect(addComment.nativeElement.addUrl).toBe(mockActions.create.url);
    });

    it('should render mp-comment', () => {
        fixture.detectChanges();
        const comments = fixture.debugElement.queryAll(By.css('mp-comment'));

        comments.forEach((comment, i) => {
            expect(comment.nativeElement.comment).toEqual(mockComments[i]);
            expect(comment.nativeElement.updateUrl).toBe(mockActions.update.url);
            expect(comment.nativeElement.removeUrl).toBe(mockActions.remove.url);
            expect(comment.nativeElement.translations).toEqual({
                update: 'Update',
                edit: 'Edit',
                remove: 'Remove',
                updated: 'Updated',
            });
        });
    });
});
