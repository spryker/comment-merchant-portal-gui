<?php

/**
 * Copyright © 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Spryker Marketplace License Agreement. See LICENSE file.
 */

namespace Spryker\Zed\CommentMerchantPortalGui\Communication\Validator;

use Generated\Shared\Transfer\MessageTransfer;
use Generated\Shared\Transfer\ValidationResponseTransfer;
use Symfony\Component\Security\Csrf\CsrfToken;
use Symfony\Component\Security\Csrf\CsrfTokenManagerInterface;

class CsrfTokenValidator implements CsrfTokenValidatorInterface
{
    /**
     * @var string
     */
    protected const ERROR_MESSAGE_INVALID_CSRF_TOKEN = 'Unexpected error occurred.';

    /**
     * @var \Symfony\Component\Security\Csrf\CsrfTokenManagerInterface
     */
    protected CsrfTokenManagerInterface $csrfTokenManager;

    public function __construct(CsrfTokenManagerInterface $csrfTokenManager)
    {
        $this->csrfTokenManager = $csrfTokenManager;
    }

    public function validate(string $tokenId, string $value): ValidationResponseTransfer
    {
        $validationResponseTransfer = (new ValidationResponseTransfer())->setIsSuccess(true);

        $csrfToken = new CsrfToken($tokenId, $value);
        if ($this->csrfTokenManager->isTokenValid($csrfToken)) {
            return $validationResponseTransfer;
        }

        return $validationResponseTransfer
            ->addErrorMessage($this->createInvalidCsrfTokenErrorMessage())
            ->setIsSuccess(false);
    }

    protected function createInvalidCsrfTokenErrorMessage(): MessageTransfer
    {
        return (new MessageTransfer())
            ->setValue(static::ERROR_MESSAGE_INVALID_CSRF_TOKEN);
    }
}
