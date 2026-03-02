<?php

/**
 * Copyright © 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Spryker Marketplace License Agreement. See LICENSE file.
 */

namespace Spryker\Zed\CommentMerchantPortalGui\Communication;

use Spryker\Zed\CommentMerchantPortalGui\CommentMerchantPortalGuiDependencyProvider;
use Spryker\Zed\CommentMerchantPortalGui\Communication\Translator\MessageTranslator;
use Spryker\Zed\CommentMerchantPortalGui\Communication\Translator\MessageTranslatorInterface;
use Spryker\Zed\CommentMerchantPortalGui\Communication\Validator\CsrfTokenValidator;
use Spryker\Zed\CommentMerchantPortalGui\Communication\Validator\CsrfTokenValidatorInterface;
use Spryker\Zed\CommentMerchantPortalGui\Dependency\Facade\CommentMerchantPortalGuiToCommentFacadeInterface;
use Spryker\Zed\CommentMerchantPortalGui\Dependency\Facade\CommentMerchantPortalGuiToMerchantUserFacadeInterface;
use Spryker\Zed\CommentMerchantPortalGui\Dependency\Facade\CommentMerchantPortalGuiToTranslatorFacadeInterface;
use Spryker\Zed\Kernel\Communication\AbstractCommunicationFactory;
use Symfony\Component\Security\Csrf\CsrfTokenManagerInterface;

/**
 * @method \Spryker\Zed\CommentMerchantPortalGui\CommentMerchantPortalGuiConfig getConfig()
 */
class CommentMerchantPortalGuiCommunicationFactory extends AbstractCommunicationFactory
{
    public function createCsrfTokenValidator(): CsrfTokenValidatorInterface
    {
        return new CsrfTokenValidator($this->getCsrfTokenManager());
    }

    public function createMessageTranslator(): MessageTranslatorInterface
    {
        return new MessageTranslator($this->getTranslatorFacade());
    }

    public function getCommentFacade(): CommentMerchantPortalGuiToCommentFacadeInterface
    {
        return $this->getProvidedDependency(CommentMerchantPortalGuiDependencyProvider::FACADE_COMMENT);
    }

    public function getMerchantUserFacade(): CommentMerchantPortalGuiToMerchantUserFacadeInterface
    {
        return $this->getProvidedDependency(CommentMerchantPortalGuiDependencyProvider::FACADE_MERCHANT_USER);
    }

    public function getTranslatorFacade(): CommentMerchantPortalGuiToTranslatorFacadeInterface
    {
        return $this->getProvidedDependency(CommentMerchantPortalGuiDependencyProvider::FACADE_TRANSLATOR);
    }

    public function getCsrfTokenManager(): CsrfTokenManagerInterface
    {
        return $this->getProvidedDependency(CommentMerchantPortalGuiDependencyProvider::SERVICE_FORM_CSRF_PROVIDER);
    }
}
