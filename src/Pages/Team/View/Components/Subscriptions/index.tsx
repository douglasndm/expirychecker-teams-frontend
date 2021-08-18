import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { Button, ButtonText } from '../../../../../Components/Button/styles';

import { Section, SectionTitle } from '../../styles';

import { SubscriptionDescription } from './styles';

const Subscriptions: React.FC = () => {
    const history = useHistory();

    const handleNavigatePurchase = useCallback(() => {
        history.push('/team/subscription');
    }, [history]);

    return (
        <Section>
            <SectionTitle>Assinaturas</SectionTitle>

            <SubscriptionDescription>
                Com uma assinatura você pode manter um time e adicionar pessoas
                a ele. Todas as mudanças feitas serão refletidas em todos os
                dispositivos
            </SubscriptionDescription>

            <Button
                onClick={handleNavigatePurchase}
                style={{ alignSelf: 'center', marginTop: 25 }}
            >
                <ButtonText>Ver Planos</ButtonText>
            </Button>
        </Section>
    );
};

export default Subscriptions;
