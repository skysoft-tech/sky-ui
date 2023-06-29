import { Injectable } from '@angular/core';

interface TokenIndex {
    token: string;
    index: number;
    separatorLength: number;
}

@Injectable()
export class StringTokenizer {
    tokenizeString(
        inputString: string,
        tokens: string[],
        keyValueSeparator: string,
        separator: string
    ): Map<string, unknown> | null {
        const tokenIndexes: TokenIndex[] = this.getTokensIndexes(inputString, tokens, keyValueSeparator);

        if (!tokenIndexes.length) {
            return null;
        }

        return this.getTokensValue(inputString, tokenIndexes, separator);
    }

    private getTokensIndexes(inputString: string, tokens: string[], keyValueSeparator: string): TokenIndex[] {
        const tokenIndexes: TokenIndex[] = [];

        for (let token of tokens) {
            const index = inputString.indexOf(token + keyValueSeparator);
            if (index === -1) {
                continue;
            }
            tokenIndexes.push({ token, index, separatorLength: keyValueSeparator.length });
        }

        return tokenIndexes.sort((t1, t2) => t1.index - t2.index);
    }

    private getTokensValue(inputString: string, tokenIndexes: TokenIndex[], separator: string): Map<string, unknown> {
        const tokens: Map<string, unknown> = new Map();
        for (let i = 0; i < tokenIndexes.length; i++) {
            const currentToken = tokenIndexes[i];
            const nextToken = i + 1 < tokenIndexes.length ? tokenIndexes[i + 1] : null;

            const startIndex = currentToken.index + currentToken.token.length + currentToken.separatorLength;
            const endIndex = nextToken ? nextToken.index : inputString.length;

            let value = inputString.slice(startIndex, endIndex);

            if (value.endsWith(separator)) {
                value = value.slice(0, -1);
            }

            tokens.set(currentToken.token, value.trim());
        }

        return tokens;
    }
}
