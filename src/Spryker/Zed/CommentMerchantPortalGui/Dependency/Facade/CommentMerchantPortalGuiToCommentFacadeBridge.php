<?php

/**
 * Copyright © 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Spryker Marketplace License Agreement. See LICENSE file.
 */

namespace Spryker\Zed\CommentMerchantPortalGui\Dependency\Facade;

use Generated\Shared\Transfer\CommentRequestTransfer;
use Generated\Shared\Transfer\CommentThreadResponseTransfer;

class CommentMerchantPortalGuiToCommentFacadeBridge implements CommentMerchantPortalGuiToCommentFacadeInterface
{
    /**
     * @var \Spryker\Zed\Comment\Business\CommentFacadeInterface
     */
    protected $commentFacade;

    /**
     * @param \Spryker\Zed\Comment\Business\CommentFacadeInterface $commentFacade
     */
    public function __construct($commentFacade)
    {
        $this->commentFacade = $commentFacade;
    }

    public function addComment(CommentRequestTransfer $commentRequestTransfer): CommentThreadResponseTransfer
    {
        return $this->commentFacade->addComment($commentRequestTransfer);
    }

    public function updateComment(CommentRequestTransfer $commentRequestTransfer): CommentThreadResponseTransfer
    {
        return $this->commentFacade->updateComment($commentRequestTransfer);
    }

    public function removeComment(CommentRequestTransfer $commentRequestTransfer): CommentThreadResponseTransfer
    {
        return $this->commentFacade->removeComment($commentRequestTransfer);
    }
}
