import React from 'react';

import { Button, ButtonText } from './styles';

interface Request {
    text: string;
    isLoading?: boolean;
    onPress: () => void;
    contentStyle?: React.CSSProperties;
}

const GenericButton: React.FC<Request> = ({
    text,
    isLoading = false,
    onPress,
    contentStyle,
}: Request) => (
    <Button onClick={onPress} disabled={!isLoading} style={contentStyle}>
        {isLoading ? (
            <ButtonText>Carregando...</ButtonText>
        ) : (
            <ButtonText>{text}</ButtonText>
        )}
    </Button>
);

export default GenericButton;
