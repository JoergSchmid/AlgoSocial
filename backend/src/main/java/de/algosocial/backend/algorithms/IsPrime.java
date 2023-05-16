package de.algosocial.backend.algorithms;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

@Controller
public class IsPrime {
    @QueryMapping
    public boolean isPrime(@Argument int number) {
        if(number == 2 || number == 3)
            return true;
        if(number < 2 || number % 2 == 0)
            return false;


        int sqrt = (int) Math.sqrt(number) + 1; // Only need to test up to the sqrt of the number

        for(int i = 3; i <= sqrt; i += 2)
            if(number % i == 0)
                return false;

        return true;
    }
}
