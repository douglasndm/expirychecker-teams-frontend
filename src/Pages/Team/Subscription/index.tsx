import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';

import Loading from 'Components/Loading';

import { getAvailablePlans } from 'Utils/Subscriptions/Plans';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Container, PageHeader, PageTitle, PageContent } from './styles';

const Subscription: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [plans, setPlans] = useState<ISubscription[]>([]);
    const [selectedPlan, setSelectedPlan] = useState<ISubscription | null>(
        null,
    );

    const loadData = useCallback(async () => {
        try {
            setIsLoading(true);

            const availablePlans = await getAvailablePlans();

            setPlans(availablePlans);
        } catch (err) {
            toast.error(err.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadData();
    }, [loadData]);

    return isLoading ? (
        <Loading />
    ) : (
        <Container>
            <PageHeader>
                <PageTitle>Assinaturas</PageTitle>
            </PageHeader>

            <PageContent>
                <div className="row row-cols-1 row-cols-md-4 mb-3 text-center">
                    {plans.map(plan => (
                        <div className="col" key={plan.membersLimit}>
                            <div
                                className={
                                    plan.membersLimit ===
                                    selectedPlan?.membersLimit
                                        ? 'card mb-4 rounded-3 shadow-sm border-primary'
                                        : 'card mb-4 rounded-3 shadow-sm'
                                }
                            >
                                <div
                                    className={
                                        plan.membersLimit ===
                                        selectedPlan?.membersLimit
                                            ? 'card-header py-3 text-white bg-primary border-primary'
                                            : 'card-header py-3'
                                    }
                                >
                                    <h4 className="my-0 fw-normal">
                                        {plan.name}
                                    </h4>
                                </div>
                                <div className="card-body">
                                    <h1 className="card-title pricing-card-title">
                                        R$
                                        {plan.price.toLocaleString(undefined, {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        })}
                                        <small className="text-muted fw-light">
                                            /mês
                                        </small>
                                    </h1>
                                    <ul className="list-unstyled mt-3 mb-4">
                                        <li>Sem limites de produtos</li>
                                        <li>Sem anúncios</li>
                                        <li>Produtos salvos na nuvem</li>
                                        <li>Notificações sobre vencimentos</li>
                                    </ul>
                                    <button
                                        type="button"
                                        className={
                                            plan.membersLimit ===
                                            selectedPlan?.membersLimit
                                                ? 'w-100 btn btn-lg btn-primary'
                                                : 'w-100 btn btn-lg btn-outline-primary'
                                        }
                                        onClick={() => setSelectedPlan(plan)}
                                    >
                                        {plan.membersLimit ===
                                        selectedPlan?.membersLimit
                                            ? 'Selecionado'
                                            : 'Selecionar'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <button type="button" className="w-50 btn btn-lg btn-primary">
                    Assinar
                </button>
            </PageContent>
        </Container>
    );
};

export default Subscription;
